import { FC } from "react";
import { useShip } from "../../../../hooks/ship/useShip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface FuelProps { }

export const Fuel: FC<FuelProps> = () => {

    const shipContext = useShip();

    return (
        <>
            <p><FontAwesomeIcon icon="gas-pump" /> {shipContext.fuel?.current} / {shipContext.fuel?.capacity}</p>
            <progress className='fuel' value={shipContext.fuel?.current} max={shipContext.fuel?.capacity}></progress>
        </>
    );
}
