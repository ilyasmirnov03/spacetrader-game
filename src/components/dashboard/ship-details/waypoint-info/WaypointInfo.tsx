import {FC, useCallback, useEffect, useState} from 'react';
import {Waypoint} from '../../../../models/waypoint.model.ts';
import {useAuth} from '../../../../hooks/auth/useAuth.tsx';
import {callApi} from '../../../../utils/api/api-caller.ts';
import {useShip} from '../../../../hooks/ship/useShip.ts';
import {mineableWaypointTypes} from '../../../../constants/mineableWaypointTypes.ts';

interface WaypointInfoProps {
}

export const WaypointInfo: FC<WaypointInfoProps> = () => {
    const [waypoint, setWaypoint] = useState<Waypoint>();

    const auth = useAuth();
    const shipContext = useShip();

    const getLocation = useCallback(() => {
        if (!shipContext.nav) {
            return;
        }
        callApi<Waypoint>(`/systems/${shipContext.nav.systemSymbol}/waypoints/${shipContext.nav.waypointSymbol}`, auth.token)
            .then((res) => {
                setWaypoint(res.data);
            });
    }, [shipContext.nav, auth.token]);

    function hasTrait(symbol: string): boolean {
        return Boolean(waypoint?.traits.some(trait => trait.symbol === symbol));
    }

    function canMine(): boolean {
        if (!waypoint) {
            return false;
        }
        return mineableWaypointTypes.includes(waypoint.type);
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
            <footer className="flex">
                {hasTrait('MARKETPLACE') &&
                    <button className="button" onClick={shipContext.getMarketplaceInfo}>Get marketplace info</button>}
                {hasTrait('SHIPYARD') &&
                    <button className="button" onClick={shipContext.getShipyard}>Get shipyard</button>}
                {canMine() &&
                    <button className="button" onClick={shipContext.extractResources}>Extract resources</button>}
            </footer>
        </article>
    );
};