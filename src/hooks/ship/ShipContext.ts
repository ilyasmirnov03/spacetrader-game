import {createContext} from 'react';
import {Cargo, Fuel, Nav, ShipModel} from '../../models/ship.model.ts';
import {Waypoint} from '../../models/waypoint.model.ts';

interface ShipContextInterface {
    ship: ShipModel | undefined;
    waypoints: Waypoint[];
    scanWaypoints: () => void
    navigateToWaypoint: (w: Waypoint) => void,
    extractResources: () => void,
    toggleShipNavStatus: (s: string) => void,
    cooldown: number,
    fuel: Fuel | undefined,
    nav: Nav | undefined,
    cargo: Cargo | undefined,
}

export const ShipContext = createContext<ShipContextInterface>({
    ship: undefined,
    fuel: undefined,
    waypoints: [],
    scanWaypoints: () => {
    },
    navigateToWaypoint: () => {
    },
    extractResources: () => {
    },
    toggleShipNavStatus: () => {
    },
    cooldown: 0,
    nav: undefined,
    cargo: undefined,
});