import { FC } from "react";
import { shipCanPerformAction } from "../../../../utils/ship/shipCanPerformAction";
import { useShip } from "../../../../hooks/ship/useShip";
import { getDistanceToWaypoint } from "../../../../utils/ship/getDistanceToWaypoint";
import { getArrivalTime } from "../../../../utils/ship/getArrivalTime";
import "./waypoints.css";
interface WaypointsProps { }

export const Waypoints: FC<WaypointsProps> = () => {

    const shipContext = useShip();

    return (
        <article className="shipWaypoints vertical-flex-layout">
            <button disabled={!shipCanPerformAction(shipContext.ship, shipContext.cooldown ?? 0)} className="button"
                onClick={shipContext.scanWaypoints}>Scan nearby waypoints
            </button>
            {shipContext.waypoints.length === 0 && <p>Waypoints haven't been scanned.</p>}
            {/* Waypoints holder */}
            <ul className="shipWaypoints__container">
                {shipContext.waypoints?.map(waypoint => (
                    <li className="shipWaypoints__waypoint tab" key={waypoint.symbol}>
                        <p>{waypoint.type} {waypoint.symbol}</p>
                        <p>{waypoint.traits.map(trait => trait.name + ',')}</p>
                        <p>Distance - {Math.round(getDistanceToWaypoint(shipContext.ship, waypoint))}</p>
                        <p>Will arrive: {getArrivalTime(shipContext.ship, waypoint)}</p>
                        <button className="button" onClick={() => shipContext.navigateToWaypoint(waypoint)}>Navigate to waypoint</button>
                    </li>
                ))}
            </ul>
        </article>
    );
}
