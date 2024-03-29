import { FC, useCallback, useEffect, useState } from 'react';
import { ShipModel } from "../../../models/ship.model.ts";
import { Link } from 'react-router-dom';
import "./ships.css";
import { useAuth } from '../../../hooks/auth/useAuth.tsx';
import { callApi } from "../../../utils/api/api-caller.ts";
import { Fuel } from '../ship-details/fuel/Fuel.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ShipsProps { }

export const Ships: FC<ShipsProps> = () => {

    const [ships, setShips] = useState<ShipModel[]>();

    const auth = useAuth();

    const getShips = useCallback(() => {
        callApi<ShipModel[]>(`/my/ships`, auth.token)
            .then((res) => {
                setShips(res.data);
            });
    }, [auth.token]);

    useEffect(() => {
        getShips();
    }, [getShips])

    return (
        <section>
            <header className="mb-10">
                <h2 className="title-3xl">Ships</h2>
            </header>
            <div className="shipsContainer">
                {ships?.map(ship => (
                    <article key={ship.symbol} className="tab vertical-flex-layout">
                        <h3 className="title-2xl">{ship.symbol} {ship.frame.symbol}</h3>
                        <p><FontAwesomeIcon icon="location-dot" /> {ship.nav.waypointSymbol} {ship.nav.route.destination.type}</p>
                        {ship.frame.fuelCapacity > 0 && <Fuel fuel={ship.fuel} />}
                        <footer>
                            <Link className="button" to={`/ships/${ship.symbol}`} state={{ ship }}>Ship details</Link>
                        </footer>
                    </article>
                ))}
            </div>
        </section>
    );
}
