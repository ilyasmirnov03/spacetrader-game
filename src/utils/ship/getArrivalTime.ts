import {FlightMode, ShipModel} from '../../models/ship.model.ts';
import {getDistanceToWaypoint} from './getDistanceToWaypoint.ts';
import {Waypoint} from '../../models/waypoint.model.ts';
import {getReadableDate} from '../getReadableDate.ts';

const multiplier: {[key in FlightMode]: number} = {
    'CRUISE': 25,
    'DRIFT': 250,
    'BURN': 12.5,
    'STEALTH': 30
}

export function getArrivalTime(ship: ShipModel | undefined, waypoint: Waypoint): string {
    const secondsToArrival = Math.round(
        Math.round(
            Math.max(1, Math.round(getDistanceToWaypoint(ship, waypoint)))
        ) * (multiplier[ship?.nav.flightMode] / ship?.engine.speed) + 15
    );
    const arrivalTimestamp = Date.now() + secondsToArrival * 1000;
    return getReadableDate(new Date(arrivalTimestamp));
}