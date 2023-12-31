import {FC} from 'react';
import {shipCanPerformAction} from '../../../../utils/ship/shipCanPerformAction';
import {useShip} from '../../../../hooks/ship/useShip';
import {getDistanceToWaypoint} from '../../../../utils/ship/getDistanceToWaypoint';
import {getArrivalTime} from '../../../../utils/ship/getArrivalTime';

interface WaypointsProps {
}

export const Waypoints: FC<WaypointsProps> = () => {

    const shipContext = useShip();

    return (
        <article className="w-full vertical-flex-layout">
            <button disabled={!shipCanPerformAction(shipContext.ship, shipContext.cooldown ?? 0)} className="button"
                    onClick={shipContext.scanWaypoints}>Scan nearby waypoints
            </button>
            {shipContext.waypoints.length === 0 && <p>Waypoints haven't been scanned.</p>}
            {/* Waypoints holder */}
            <ul className="longList">
                {shipContext.waypoints?.map(waypoint => (
                    <li className="tab vertical-flex-layout" key={waypoint.symbol}>
                        <p>{waypoint.type} {waypoint.symbol}</p>
                        <p>{waypoint.traits.map(trait => trait.name + ',')}</p>
                        <p>Distance - {Math.round(getDistanceToWaypoint(shipContext.nav, waypoint))}</p>
                        <p>Will arrive: {getArrivalTime(shipContext.nav, shipContext.ship?.engine.speed, waypoint)}</p>
                        <button className="button bottom-anchored"
                                onClick={() => shipContext.navigateToWaypoint(waypoint.symbol)}>
                            Navigate to waypoint
                        </button>
                    </li>
                ))}
            </ul>
        </article>
    );
};
