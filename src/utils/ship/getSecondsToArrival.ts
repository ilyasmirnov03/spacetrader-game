import {Nav} from '../../models/ship.model.ts';

export function getSecondsToArrival(nav: Nav | undefined): number {
    if (!nav) {
        return 0;
    }
    const arrivalDate = new Date(nav.route.arrival).getTime();
    return Math.floor((arrivalDate - Date.now()) / 1000);
}