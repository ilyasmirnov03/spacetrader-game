import axios from "axios";
import {FC, useCallback, useEffect, useState} from 'react';
import { ShipModel } from "../../../models/ship.model.ts";
import { ApiResponse } from "../../../models/api-response";
import {Link} from 'react-router-dom';
import "./ships.css";
import {url} from '../../../constants/url.const.ts';
import {useAuth} from '../../../hooks/auth/useAuth.tsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface ShipsProps { }

export const Ships: FC<ShipsProps> = () => {

    const [ships, setShips] = useState<ShipModel[]>();

    const auth = useAuth();

    const getShips = useCallback(() => {
        axios.get(`${url}/my/ships`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
        }).then((data) => {
            setShips((data.data as ApiResponse).data as ShipModel[]);
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
                    <article key={ship.symbol}>
                        <h3 className="title-2xl">{ship.symbol}</h3>
                        <p><FontAwesomeIcon icon="gas-pump"/> {ship.fuel.current} / {ship.fuel.capacity}</p>
                        <progress className='fuel' value={ship.fuel.current} max={ship.fuel.capacity}></progress>
                        <footer>
                            <Link className="button" to={`/ships/${ship.symbol}`} state={{ ship }}>Ship details</Link>
                        </footer>
                    </article>
                ))}
            </div>
        </section>
    );
}
