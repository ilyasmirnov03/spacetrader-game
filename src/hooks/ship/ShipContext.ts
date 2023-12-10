import {createContext} from 'react';
import {Fuel, Nav, ShipModel} from '../../models/ship.model.ts';
import {Waypoint} from '../../models/waypoint.model.ts';

interface ShipContextInterface {
    ship: ShipModel | undefined;
    waypoints: Waypoint[];
    scanWaypoints: () => void
    navigateToWaypoint: (w: Waypoint) => void
    cooldown: number,
    fuel: Fuel | undefined,
    nav: Nav | undefined,
}

export const ShipContext = createContext<ShipContextInterface>({
    ship: undefined,
    fuel: undefined,
    waypoints: [],
    scanWaypoints: () => {
    },
    navigateToWaypoint: () => {
    },
    cooldown: 0,
    nav: undefined,
});