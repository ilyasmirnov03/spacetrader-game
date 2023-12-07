import axios from "axios";
import { FC, useEffect, useState } from "react";
import { ShipModel } from "../../../models/ship.model.ts";
import environment from "../../../constants/environment.const";
import { ApiResponse } from "../../../models/api-response";
import {Link} from 'react-router-dom';
import "./ships.css";

interface ShipsProps { }

export const Ships: FC<ShipsProps> = () => {

    const [ships, setShips] = useState<ShipModel[]>();

    function getShips(): void {
        axios.get(`${environment.baseUrl}/my/ships`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${environment.loginToken}`
            },
        }).then((data) => {
            setShips((data.data as ApiResponse).data as ShipModel[]);
        });
    }

    useEffect(() => {
        getShips();
    }, [])

    return (
        <section>
            <header>
                <h2>Ships</h2>
            </header>
            <div className="shipsContainer">
                {ships?.map(ship => (
                    <article key={ship.symbol}>
                        <h3>{ship.symbol}</h3>
                        <p>Fuel: {ship.fuel.current} / {ship.fuel.capacity}</p>
                        <progress value={ship.fuel.current} max={ship.fuel.capacity}></progress>
                        <footer>
                            <Link className="linkButton" to={`/ships/${ship.symbol}`} state={{ ship }}>See ship details</Link>
                        </footer>
                    </article>
                ))}
            </div>
        </section>
    );
}
