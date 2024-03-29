import { FC } from 'react';
import { shipNavStatusTransform } from '../../../utils/ship/shipNavStatusTransform.tsx';
import { WaypointInfo } from './waypoint-info/WaypointInfo.tsx';
import { useShip } from '../../../hooks/ship/useShip.ts';
import { Cargo } from './cargo/Cargo.tsx';
import { Fuel } from './fuel/Fuel.tsx';
import { Waypoints } from './waypoints/Waypoints.tsx';
import './ship-details.css';
import { Marketplace } from './marketplace/Marketplace.tsx';
import { Shipyard } from './shipyard/Shipyard.tsx';
import { PreviousWaypoint } from './previous-waypoint/PreviousWaypoint.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Cooldown } from './cooldown/Cooldown.tsx';
import { Refuel } from './fuel/ Refuel.tsx';

export const ShipDetails: FC = () => {

    const shipContext = useShip();

    function getOppositeNavStatus(): 'dock' | 'orbit' {
        return shipContext.nav?.status === 'IN_ORBIT' ? 'dock' : 'orbit';
    }

    function toggleNavStatus() {
        shipContext.toggleShipNavStatus(getOppositeNavStatus());
    }

    return (
        <section className="shipDetails__layout">
            <header className="tab vertical-flex-layout">
                <div className="flex justify-between items-center">
                    <h2 className="title-3xl">{shipContext.ship?.symbol}</h2>
                    <Cooldown />
                </div>
                <div className="flex items-center">
                    {shipNavStatusTransform(shipContext.nav)}
                    {shipContext.nav?.status === 'IN_TRANSIT' &&
                        <p>
                            <FontAwesomeIcon icon="angles-right" />
                            in transit ({shipContext.arrivalTime}s)
                        </p>}
                    {shipContext.nav?.status !== 'IN_TRANSIT' &&
                        <button className="button" onClick={toggleNavStatus}>{getOppositeNavStatus()}</button>}
                </div>
                <p>Flight mode: {shipContext.nav?.flightMode}</p>
                {(shipContext.ship?.frame.fuelCapacity ?? 0) > 0 &&
                    <>
                        <Fuel fuel={shipContext.fuel} />
                        <Refuel />
                    </>
                }
            </header>
            <WaypointInfo />
            {(shipContext.ship?.cargo.capacity ?? 0) > 0 && <Cargo />}
            <PreviousWaypoint />
            <Waypoints />
            {shipContext.marketplace && <Marketplace />}
            {shipContext.shipyard && <Shipyard />}
        </section>
    );
};
