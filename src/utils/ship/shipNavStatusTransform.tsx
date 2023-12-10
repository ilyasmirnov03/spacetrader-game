import {ReactElement} from 'react';
import {NavStatus, ShipModel} from '../../models/ship.model.ts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {getReadableDate} from '../getReadableDate.ts';

const elements: { [key in NavStatus]: ReactElement } = {
    'IN_ORBIT': <p><FontAwesomeIcon icon="satellite"/> in orbit</p>,
    'DOCKED': <p><FontAwesomeIcon icon="anchor"/> docked</p>
};

export function shipNavStatusTransform(ship: ShipModel | undefined): ReactElement {
    if (ship?.nav.status === 'IN_TRANSIT') {
        return <p>
            <FontAwesomeIcon icon="angles-right"/>
            in transit (arrives {getReadableDate(new Date(ship.nav.route.arrival))})
        </p>;
    }
    return elements[ship?.nav.status];
}