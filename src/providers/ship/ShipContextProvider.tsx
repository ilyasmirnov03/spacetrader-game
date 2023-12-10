import {ReactElement, useCallback, useEffect, useState} from 'react';
import {useAuth} from '../../hooks/auth/useAuth.tsx';
import {useLocation, useParams} from 'react-router-dom';
import {ShipContext} from '../../hooks/ship/ShipContext.ts';
import {ShipModel} from '../../models/ship.model.ts';
import {Waypoint, WaypointResponse} from '../../models/waypoint.model.ts';
import {url} from '../../constants/url.const.ts';
import {ApiResponse} from '../../models/api-response.ts';
import axios from 'axios';

interface ShipContextProviderProps {
    children: ReactElement;
}

export function ShipContextProvider({children}: ShipContextProviderProps) {
    const auth = useAuth();

    // State passed from clicked button, can be undefined if request didn't come from button click
    const {state} = useLocation();

    // Id from url params
    const {shipId} = useParams();

    // State
    const [ship, setShip] = useState<ShipModel>();
    const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
    const [cooldown, setCooldown] = useState<number>(0);

    const getShip = useCallback(() => {
        axios.get(`${url}/my/ships/${shipId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
        }).then((data) => {
            const ship = (data.data as ApiResponse).data as ShipModel;
            setShip(ship);
            setCooldown(ship.cooldown.remainingSeconds);
        });
    }, [shipId, auth.token]);

    // Initialize ship-details state from url state or from API
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

    // Scan waypoints around this ship-details
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
            const waypointResponse = (data.data as ApiResponse).data as WaypointResponse;
            setWaypoints(waypointResponse.waypoints);
            setCooldown(waypointResponse.cooldown.remainingSeconds);
        });
    }

    return <ShipContext.Provider value={{
        ship,
        waypoints,
        scanWaypoints,
        cooldown,
    }}>
        {children}
    </ShipContext.Provider>;
}