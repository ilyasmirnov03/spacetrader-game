import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './fuel.css';
import {ShipModel} from '../../../../models/ship.model.ts';
interface FuelProps {
    ship: ShipModel | undefined,
}

export const Fuel: FC<FuelProps> = ({ ship }) => {

    if (ship?.frame.fuelCapacity === 0) {
        return <p>Ship can't hold fuel.</p>
    }

    return (
        <>
            <p><FontAwesomeIcon icon="gas-pump" /> {ship?.fuel.current} / {ship?.fuel.capacity}</p>
            <progress className='fuel' value={ship?.fuel?.current} max={ship?.fuel.capacity}></progress>
        </>
    );
}
