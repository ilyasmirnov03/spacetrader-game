import {FC, useCallback, useEffect, useState} from 'react';
import {ShipModel} from '../../../../models/ship.model.ts';
import {useLocation, useParams} from 'react-router-dom';
import axios from 'axios';
import {ApiResponse} from '../../../../models/api-response.ts';
import {Waypoint, WaypointResponse} from '../../../../models/waypoint.model.ts';
import {Point} from '../../../../models/point.ts';
import './ship.css';
import {useAuth} from '../../../../hooks/auth/useAuth.tsx';
import {url} from '../../../../constants/url.const.ts';

interface ShipProps {
}

export const Ship: FC<ShipProps> = () => {

    const auth = useAuth();

    const [ship, setShip] = useState<ShipModel>();
    const [waypoints, setWaypoints] = useState<Waypoint[]>();
    const [cooldown, setCooldown] = useState<number | undefined>(0);

    // State passed from clicked button, can be undefined if request didn't come from button click
    const {state} = useLocation();

    // Id from url params
    const {shipId} = useParams();

    const getShip = useCallback(() => {
        axios.get(`${url}/my/ships/${shipId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
        }).then((data) => {
            const ship = (data.data as ApiResponse).data as ShipModel | undefined;
            setShip(ship);
            setCooldown(ship?.cooldown.remainingSeconds);
        });
    }, [shipId, auth.token]);

    // Initialize ship state from url state or from API
    useEffect(() => {
        if (state?.ship) {
            setShip(state.ship as ShipModel);
            setCooldown(state.ship.cooldown.remainingSeconds);
        } else {
            getShip();
        }
    }, [state?.ship, getShip]);

    // Handle interval logic
    useEffect(() => {
        let intervalId: number;

        const handleInterval = () => {
            setCooldown((cooldown) => {
                if (cooldown && cooldown > 0) {
                    return cooldown - 1;
                }
                clearInterval(intervalId);
                return 0;
            });
        };

        // Set the interval only if cooldown is greater than 0
        if (cooldown && cooldown > 0) {
            intervalId = setInterval(handleInterval, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [cooldown]);

    // Return distance based on two points
    function getDistance(point1: Point, point2: Point): number {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Scan waypoints around this ship
    function scanWaypoints(): void {
        axios.post(`${url}/my/ships/${ship?.symbol}/scan/waypoints`,
            undefined,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
            }
        ).then((data) => {
            const waypointResponse = (data.data as ApiResponse).data as WaypointResponse | undefined;
            setWaypoints(waypointResponse?.waypoints);
            setCooldown(waypointResponse?.cooldown.remainingSeconds);
        });
    }

    return (
        <section>
            <h2 className="title-3xl mb-10">{ship?.symbol} - Cooldown {cooldown}s</h2>
            <p>Fuel: {ship?.fuel.current} / {ship?.fuel.capacity}</p>
            <progress value={ship?.fuel.current} max={ship?.fuel.capacity}></progress>
            <button disabled={cooldown != 0} className="button" onClick={scanWaypoints}>Scan nearby waypoints</button>
            {/* Waypoints holder */}
            <ul className="ship__waypoints">
                {waypoints?.map(waypoint => (
                    <li key={waypoint.symbol}>
                        <p>{waypoint.type}</p>
                        <p>Distance - {getDistance(
                            {x: ship?.nav.route.destination.x ?? 0, y: ship?.nav.route.destination.y ?? 0},
                            {x: waypoint.x, y: waypoint.y},
                        )}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};
