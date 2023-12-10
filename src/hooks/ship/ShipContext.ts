import {createContext} from 'react';
import {ShipModel} from '../../models/ship.model.ts';
import {Waypoint} from '../../models/waypoint.model.ts';

interface ShipContextInterface {
    ship: ShipModel | undefined;
    waypoints: Waypoint[];
    scanWaypoints: () => void
    cooldown: number,
}

export const ShipContext = createContext<ShipContextInterface>({
    ship: undefined,
    waypoints: [],
    scanWaypoints: () => {},
    cooldown: 0,
});