import { FC } from 'react';
import { shipNavStatusTransform } from '../../../utils/ship/shipNavStatusTransform.tsx';
import { WaypointInfo } from './waypoint-info/WaypointInfo.tsx';
import { useShip } from '../../../hooks/ship/useShip.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Cargo } from './cargo/Cargo.tsx';
import { Fuel } from './fuel/Fuel.tsx';
import { Waypoints } from './waypoints/Waypoints.tsx';

export const ShipDetails: FC = () => {

    const shipContext = useShip();

    return (
        <section>
            <header className="mb-10">
                <div className="flex">
                    <h2 className="title-3xl">{shipContext.ship?.symbol} - Cooldown {shipContext.cooldown}s</h2>
                    <button className="icon"><FontAwesomeIcon icon="rotate-right" /></button>
                </div>
                {shipNavStatusTransform(shipContext.nav)}
                <p>Flight mode: {shipContext.nav?.flightMode}</p>
            </header>
            <Fuel />
            <WaypointInfo nav={shipContext.nav} />
            <Cargo />
            <Waypoints />
        </section>
    );
};
