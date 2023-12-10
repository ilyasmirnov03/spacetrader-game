import {useContext} from 'react';
import {ShipContext} from './ShipContext.ts';

export function useShip() {
    return useContext(ShipContext);
}