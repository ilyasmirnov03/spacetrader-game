import {FC, useCallback, useEffect, useState} from 'react';
import {ShipModel} from '../../../../models/ship.model.ts';
import {useLocation, useParams} from 'react-router-dom';
import axios from 'axios';
import {ApiResponse} from '../../../../models/api-response.ts';
import {Waypoint, WaypointResponse} from '../../../../models/waypoint.model.ts';
import './ship.css';
import {useAuth} from '../../../../hooks/auth/useAuth.tsx';
import {url} from '../../../../constants/url.const.ts';
import {shipCanPerformAction} from '../../../../utils/ship/shipCanPerformAction.ts';
import {shipNavStatusTransform} from '../../../../utils/ship/shipNavStatusTransform.tsx';
import {getArrivalTime} from '../../../../utils/ship/getArrivalTime.ts';
import {getDistanceToWaypoint} from '../../../../utils/ship/getDistanceToWaypoint.ts';

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
            <header className="mb-10">
                <h2 className="title-3xl">{ship?.symbol} - Cooldown {cooldown}s</h2>
                {shipNavStatusTransform(ship)}
                <p>Flight mode: {ship?.nav.flightMode}</p>
            </header>
            <p>Fuel: {ship?.fuel.current} / {ship?.fuel.capacity}</p>
            <progress value={ship?.fuel.current} max={ship?.fuel.capacity}></progress>
            <button disabled={!shipCanPerformAction(ship, cooldown ?? 0)} className="button" onClick={scanWaypoints}>Scan nearby waypoints</button>
            {/* Waypoints holder */}
            <ul className="ship__waypoints">
                {waypoints?.map(waypoint => (
                    <li className="ship__waypoint" key={waypoint.symbol}>
                        <p>{waypoint.type}</p>
                        <p>{waypoint.traits.map(trait => trait.name + ',')}</p>
                        <p>Distance - {Math.round(getDistanceToWaypoint(ship, waypoint))}</p>
                        <p>Will arrive: {getArrivalTime(ship, waypoint)}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};
