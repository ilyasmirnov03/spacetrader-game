import {ShipModel} from '../../models/ship.model.ts';

export function shipCanPerformAction(ship: ShipModel | undefined, cooldown: number): boolean {
    return cooldown === 0 && ship?.nav.status !== 'IN_TRANSIT';
}