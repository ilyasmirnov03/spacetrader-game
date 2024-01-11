import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './fuel.css';
import { FuelModel } from '../../../../models/ship.model.ts';
interface FuelProps {
    fuel: FuelModel | undefined,
}

export const Fuel: FC<FuelProps> = ({ fuel }) => {

    return (
        <>
            <p><FontAwesomeIcon icon="gas-pump" /> {fuel?.current} / {fuel?.capacity}</p>
            <progress className='fuel' value={fuel?.current} max={fuel?.capacity}></progress>
        </>
    );
}
