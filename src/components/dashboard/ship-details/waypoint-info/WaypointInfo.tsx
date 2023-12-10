import {FC, useCallback, useEffect, useState} from 'react';
import {Nav} from '../../../../models/ship.model.ts';
import axios from 'axios';
import {url} from '../../../../constants/url.const.ts';
import {Waypoint} from '../../../../models/waypoint.model.ts';
import {ApiResponse} from '../../../../models/api-response/api-response.ts';
import {Market} from '../../../../models/market.model.ts';
import {useAuth} from '../../../../hooks/auth/useAuth.tsx';
import "./waypoint-info.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface WaypointInfoProps {
    nav: Nav | undefined,
}

export const WaypointInfo: FC<WaypointInfoProps> = ({nav}) => {
    const [waypoint, setWaypoint] = useState<Waypoint>();
    const [marketplace, setMarketplace] = useState<Market>();

    const auth = useAuth();

    const getLocation = useCallback(() => {
        if (!nav) {
            return;
        }
        axios.get(`${url}/systems/${nav.systemSymbol}/waypoints/${nav.waypointSymbol}`)
            .then((data) => {
                const response = data.data as ApiResponse<Waypoint>;
                setWaypoint(response.data);
            });
    }, [nav]);

    function getMarketplaceInfo(): void {
        axios.get(`${url}/systems/${nav?.systemSymbol}/waypoints/${nav?.waypointSymbol}/market`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            }
        })
            .then((data) => {
                const response = data.data as ApiResponse<Market>;
                setMarketplace(response.data);
            });
    }

    function hasMarketplace(): boolean {
        return Boolean(waypoint?.traits.some(trait => trait.symbol === 'MARKETPLACE'));
    }

    useEffect(() => {
        getLocation();
    }, [getLocation]);

    return (
        <section>
            <header className="mb-10">
                <h2 className="title-3xl">{waypoint?.type} - {waypoint?.symbol}</h2>
            </header>
            <p>{waypoint?.traits.map(trait => trait.name + ', ')}</p>
            {hasMarketplace() &&
                <button className="button" onClick={getMarketplaceInfo}>Get marketplace info</button>}
            <ul className="tradeGoods">
                {marketplace?.tradeGoods?.map(good => (
                    <li key={good.symbol} className="tradeGood">
                        <p>{good.symbol} - {good.type}</p>
                        <p>Supply: {good.supply}</p>
                        <p>Sell: {good.sellPrice}<FontAwesomeIcon icon="coins"/></p>
                        <p>Buy: {good.purchasePrice}<FontAwesomeIcon icon="coins"/></p>
                    </li>
                ))}
            </ul>
        </section>
    );
};