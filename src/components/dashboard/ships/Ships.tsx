import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Ship } from "../../../models/ship";
import environment from "../../../constants/environment.const";
import { ApiResponse } from "../../../models/api-response";
interface ShipsProps { }

export const Ships: FC<ShipsProps> = () => {

    const [ships, setShips] = useState<Ship[]>();

    function getShips(): void {
        axios.get(`${environment.baseUrl}/my/ships`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${environment.loginToken}`
            },
        }).then((data) => {
            setShips((data.data as ApiResponse).data as Ship[]);
        });
    }

    useEffect(() => {
        getShips();
    }, [])

    return (
        <section>
            <h2>Ships</h2>
            {ships?.map(ship => (
                <article key={ship.symbol}>
                    <h3>{ship.symbol}</h3>
                </article>
            ))}
        </section>
    );
}
