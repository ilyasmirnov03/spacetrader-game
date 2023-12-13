import {ShipModel} from '../ship.model.ts';
import {ShipTransaction} from '../ship-transaction.ts';

interface ShipType {
    type: string;
}

export interface ShipyardShip extends Omit<ShipModel, 'cargo' | 'fuel' | 'symbol'> {
    type: string;
    supply: string;
    activity: string;
    purchasePrice: number;
}

export interface ShipyardResponse {
    symbol: string;
    shipTypes: ShipType[];
    ships?: ShipyardShip[];
    transactions?: ShipTransaction[];
    modificationsFee: number;
}