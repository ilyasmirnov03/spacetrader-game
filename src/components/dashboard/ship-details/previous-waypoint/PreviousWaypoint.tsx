import {FC} from 'react';
import {useShip} from '../../../../hooks/ship/useShip.ts';

export const PreviousWaypoint: FC = () => {
    const shipContext = useShip();

    return (
        <article className="tab vertical-flex-layout">
            <h3 className="title-3xl">Previous waypoint</h3>
            <p>{shipContext.nav?.route.origin.type} - {shipContext.nav?.route.origin.symbol}</p>
            <button className="button"
                    onClick={() => shipContext.navigateToWaypoint(shipContext.nav?.route.origin.symbol)}>
                Navigate to waypoint
            </button>
        </article>
    )
}