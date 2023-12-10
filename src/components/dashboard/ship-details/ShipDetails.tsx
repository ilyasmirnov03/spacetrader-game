import {FC} from 'react';
import './ship-details.css';
import {shipCanPerformAction} from '../../../utils/ship/shipCanPerformAction.ts';
import {shipNavStatusTransform} from '../../../utils/ship/shipNavStatusTransform.tsx';
import {getArrivalTime} from '../../../utils/ship/getArrivalTime.ts';
import {getDistanceToWaypoint} from '../../../utils/ship/getDistanceToWaypoint.ts';
import {WaypointInfo} from './waypoint-info/WaypointInfo.tsx';
import {useShip} from '../../../hooks/ship/useShip.ts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const ShipDetails: FC = () => {

    const shipContext = useShip();

    return (
        <section>
            <header className="mb-10">
                <h2 className="title-3xl">{shipContext.ship?.symbol} - Cooldown {shipContext.cooldown}s</h2>
                {shipNavStatusTransform(shipContext.ship)}
                <p>Flight mode: {shipContext.ship?.nav.flightMode}</p>
            </header>
            <p><FontAwesomeIcon icon="gas-pump"/> {shipContext.ship?.fuel.current} / {shipContext.ship?.fuel.capacity}</p>
            <progress className='fuel' value={shipContext.ship?.fuel.current} max={shipContext.ship?.fuel.capacity}></progress>
            <WaypointInfo ship={shipContext.ship}/>
            <button disabled={!shipCanPerformAction(shipContext.ship, shipContext.cooldown ?? 0)} className="button"
                    onClick={shipContext.scanWaypoints}>Scan nearby waypoints
            </button>
            {/* Waypoints holder */}
            <ul className="ship__waypoints">
                {shipContext.waypoints?.map(waypoint => (
                    <li className="ship__waypoint" key={waypoint.symbol}>
                        <p>{waypoint.type}</p>
                        <p>{waypoint.traits.map(trait => trait.name + ',')}</p>
                        <p>Distance - {Math.round(getDistanceToWaypoint(shipContext.ship, waypoint))}</p>
                        <p>Will arrive: {getArrivalTime(shipContext.ship, waypoint)}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};
