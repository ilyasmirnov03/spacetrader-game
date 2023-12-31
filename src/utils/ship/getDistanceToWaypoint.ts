import {Nav} from '../../models/ship.model.ts';
import {Waypoint} from '../../models/waypoint.model.ts';

export function getDistanceToWaypoint(nav: Nav | undefined, waypoint: Waypoint): number {
    const point1 = {x: nav?.route.destination.x ?? 0, y: nav?.route.destination.y ?? 0};
    const point2 = {x: waypoint.x, y: waypoint.y};
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
}