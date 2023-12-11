import {FC} from 'react';
import { shipNavStatusTransform } from '../../../utils/ship/shipNavStatusTransform.tsx';
import { WaypointInfo } from './waypoint-info/WaypointInfo.tsx';
import { useShip } from '../../../hooks/ship/useShip.ts';
import { Cargo } from './cargo/Cargo.tsx';
import { Fuel } from './fuel/Fuel.tsx';
import { Waypoints } from './waypoints/Waypoints.tsx';

export const ShipDetails: FC = () => {

    const shipContext = useShip();

    function getOppositeNavStatus(): string {
        return shipContext.nav?.status === 'IN_ORBIT' ? 'dock' : 'orbit';
    }

    function toggleNavStatus() {
        shipContext.toggleShipNavStatus(getOppositeNavStatus());
    }

    return (
        <section>
            <header className="mb-10">
                <div className="flex">
                    <h2 className="title-3xl">{shipContext.ship?.symbol} - Cooldown {shipContext.cooldown}s</h2>
                </div>
                <div className="flex">
                    {shipNavStatusTransform(shipContext.nav)}
                    {shipContext.nav?.status !== 'IN_TRANSIT' &&
                        <button className="button" onClick={toggleNavStatus}>{getOppositeNavStatus()}</button>}
                </div>
                <p>Flight mode: {shipContext.nav?.flightMode}</p>
            </header>
            <Fuel />
            <WaypointInfo nav={shipContext.nav} />
            <Cargo />
            <Waypoints />
        </section>
    );
};
