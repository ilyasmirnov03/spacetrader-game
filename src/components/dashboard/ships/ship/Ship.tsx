import {FC, useEffect, useState} from 'react';
import {ShipModel} from '../../../../models/ship.model.ts';
import {useLocation, useParams} from 'react-router-dom';
import axios from 'axios';
import environment from '../../../../constants/environment.const.ts';
import {ApiResponse} from '../../../../models/api-response.ts';
interface ShipProps {
}

export const Ship: FC<ShipProps> = () => {

    const [ship, setShip] = useState<ShipModel>();

    // State passed from clicked button, can be undefined if request didn't come from button click
    const { state } = useLocation();

    // Id from url params
    const { shipId } = useParams();

    function getShip(): void {
        axios.get(`${environment.baseUrl}/my/ships/${shipId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${environment.loginToken}`
            },
        }).then((data) => {
            setShip((data.data as ApiResponse).data as ShipModel | undefined);
        });
    }

    useEffect(() => {
        if (state?.ship) {
            setShip(state.ship as ShipModel);
        } else {
            getShip();
        }
    }, []);


    return (
        <section>
            <h2 className="title-3xl mb-10">{ship?.symbol}</h2>
            <p>Fuel: {ship?.fuel.current} / {ship?.fuel.capacity}</p>
            <progress value={ship?.fuel.current} max={ship?.fuel.capacity}></progress>
        </section>
    );
}
