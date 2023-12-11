import { FC, useCallback, useEffect, useState } from 'react';
import { Nav } from '../../../../models/ship.model.ts';
import {Waypoint} from '../../../../models/waypoint.model.ts';
import { Market } from '../../../../models/market.model.ts';
import { useAuth } from '../../../../hooks/auth/useAuth.tsx';
import "./waypoint-info.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { callApi } from '../../../../utils/api/api-caller.ts';
import { useShip } from '../../../../hooks/ship/useShip.ts';
import {mineableWaypointTypes} from '../../../../constants/mineableWaypointTypes.ts';

interface WaypointInfoProps {
    nav: Nav | undefined,
}

export const WaypointInfo: FC<WaypointInfoProps> = ({ nav }) => {
    const [waypoint, setWaypoint] = useState<Waypoint>();
    const [marketplace, setMarketplace] = useState<Market>();

    const auth = useAuth();
    const shipContext = useShip();

    const getLocation = useCallback(() => {
        if (!nav) {
            return;
        }
        callApi<Waypoint>(`/systems/${nav.systemSymbol}/waypoints/${nav.waypointSymbol}`, auth.token)
            .then((res) => {
                setWaypoint(res.data);
            })
    }, [nav, auth.token]);

    function getMarketplaceInfo(): void {
        callApi<Market>(`/systems/${nav?.systemSymbol}/waypoints/${nav?.waypointSymbol}/market`, auth.token)
            .then((res) => {
                setMarketplace(res.data);
            });
    }

    function hasMarketplace(): boolean {
        return Boolean(waypoint?.traits.some(trait => trait.symbol === 'MARKETPLACE'));
    }

    function canMine(): boolean {
        if (!waypoint) {
            return false;
        }
        return mineableWaypointTypes.includes(waypoint.type);
    }

    function canSell(symbol: string): boolean {
        return Boolean(shipContext.cargo?.inventory.some(inventory => inventory.symbol === symbol));
    }

    useEffect(() => {
        getLocation();
    }, [getLocation]);

    return (
        <article className="tab vertical-flex-layout">
            <header>
                <h2 className="title-3xl">{waypoint?.type} - {waypoint?.symbol}</h2>
            </header>
            <p>{waypoint?.traits.map(trait => trait.name + ', ')}</p>
            {hasMarketplace() &&
                <button className="button" onClick={getMarketplaceInfo}>Get marketplace info</button>}
            {canMine() &&
                <button className='button' onClick={shipContext.extractResources}>Extract resources</button>}
            <ul className="tradeGoods">
                {marketplace?.tradeGoods?.map(good => (
                    <li key={good.symbol} className="tradeGood">
                        <p>{good.symbol} - {good.type}</p>
                        <p>Supply: {good.supply}</p>
                        <div className="flex">
                            <p>Sell: {good.sellPrice}<FontAwesomeIcon icon="coins" /></p>
                            {canSell(good.symbol) &&
                                <button className="button" onClick={() => shipContext.sellCargo(good.symbol)}>Sell</button>}
                        </div>
                        <div className="flex">
                            <p>Buy: {good.purchasePrice}<FontAwesomeIcon icon="coins" /></p>
                        </div>
                    </li>
                ))}
            </ul>
        </article>
    );
};