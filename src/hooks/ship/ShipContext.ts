import {createContext} from 'react';
import {Cargo, Fuel, Nav, ShipModel} from '../../models/ship.model.ts';
import {Waypoint} from '../../models/waypoint.model.ts';
import {Market} from '../../models/market.model.ts';
import {ShipyardResponse} from '../../models/api-response/shipyard-response.ts';

interface ShipContextInterface {
    ship: ShipModel | undefined;
    waypoints: Waypoint[];
    fuel: Fuel | undefined,
    cooldown: number,
    nav: Nav | undefined,
    cargo: Cargo | undefined,
    marketplace: Market | undefined,
    shipyard: ShipyardResponse | undefined,
    arrivalTime: number,
    scanWaypoints: () => void
    navigateToWaypoint: (s: string | undefined) => void,
    extractResources: () => void,
    toggleShipNavStatus: (s: 'dock' | 'orbit') => void,
    sellCargo: (s: string) => void,
    getMarketplaceInfo: () => void,
    getShipyard: () => void,
}

export const ShipContext = createContext<ShipContextInterface>({
    ship: undefined,
    fuel: undefined,
    waypoints: [],
    cooldown: 0,
    nav: undefined,
    cargo: undefined,
    marketplace: undefined,
    shipyard: undefined,
    arrivalTime: 0,
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
    getShipyard: () => {
    },
});