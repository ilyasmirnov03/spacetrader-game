import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './fuel.css';
import {FuelModel, ShipModel} from '../../../../models/ship.model.ts';
interface FuelProps {
    ship: ShipModel | undefined,
    fuel: FuelModel | undefined,
}

export const Fuel: FC<FuelProps> = ({ ship, fuel }) => {

    if (ship?.frame.fuelCapacity === 0) {
        return <p>Ship can't hold fuel.</p>
    }

    return (
        <>
            <p><FontAwesomeIcon icon="gas-pump" /> {fuel?.current} / {fuel?.capacity}</p>
            <progress className='fuel' value={fuel?.current} max={fuel?.capacity}></progress>
        </>
    );
}
