import { FC } from "react";
import { useShip } from "../../../../hooks/ship/useShip";
interface CargoProps { }

export const Cargo: FC<CargoProps> = () => {

    const shipContext = useShip();

    return (
        <section>
            <header className="mb-10">
                <h2 className="title-3xl">Cargo</h2>
            </header>
            <p>{shipContext.cargo?.units} / {shipContext.cargo?.capacity}</p>
            <ul>
                {shipContext.cargo?.inventory.map(inventory => (
                    <li key={inventory.symbol}>{inventory.symbol}: {inventory.units}</li>
                ))}
            </ul>
        </section>
    );
}
