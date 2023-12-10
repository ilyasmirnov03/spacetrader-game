import {ShipModel} from '../../models/ship.model.ts';
import {Waypoint} from '../../models/waypoint.model.ts';

export function getDistanceToWaypoint(ship: ShipModel | undefined, waypoint: Waypoint): number {
    const point1 = {x: ship?.nav.route.destination.x, y: ship?.nav.route.destination.y};
    const point2 = {x: waypoint.x, y: waypoint.y};
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
}