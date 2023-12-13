import {createContext} from 'react';
import {Cargo, Fuel, Nav, ShipModel} from '../../models/ship.model.ts';
import {Waypoint} from '../../models/waypoint.model.ts';
import {Market} from '../../models/market.model.ts';

interface ShipContextInterface {
    ship: ShipModel | undefined;
    waypoints: Waypoint[];
    fuel: Fuel | undefined,
    cooldown: number,
    nav: Nav | undefined,
    cargo: Cargo | undefined,
    marketplace: Market | undefined,
    scanWaypoints: () => void
    navigateToWaypoint: (w: Waypoint) => void,
    extractResources: () => void,
    toggleShipNavStatus: (s: string) => void,
    sellCargo: (s: string) => void,
    getMarketplaceInfo: () => void,
}

export const ShipContext = createContext<ShipContextInterface>({
    ship: undefined,
    fuel: undefined,
    waypoints: [],
    cooldown: 0,
    nav: undefined,
    cargo: undefined,
    marketplace: undefined,
    scanWaypoints: () => {
    },
    navigateToWaypoint: () => {
    },
    extractResources: () => {
    },
    toggleShipNavStatus: () => {
    },
    sellCargo: () => {
    },
    getMarketplaceInfo: () => {
    },
});