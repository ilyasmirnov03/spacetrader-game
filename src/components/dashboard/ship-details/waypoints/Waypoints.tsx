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
        <article>
            <button disabled={!shipCanPerformAction(shipContext.ship, shipContext.cooldown ?? 0)} className="button"
                onClick={shipContext.scanWaypoints}>Scan nearby waypoints
            </button>
            {/* Waypoints holder */}
            <ul className="ship__waypoints">
                {shipContext.waypoints?.map(waypoint => (
                    <li className="ship__waypoint tab" key={waypoint.symbol}>
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
