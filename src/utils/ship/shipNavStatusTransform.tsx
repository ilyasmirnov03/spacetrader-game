import {ReactElement} from 'react';
import {Nav, NavStatus} from '../../models/ship.model.ts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const elements: { [key in NavStatus]?: ReactElement } = {
    'IN_ORBIT': <p><FontAwesomeIcon icon="satellite"/> in orbit</p>,
    'DOCKED': <p><FontAwesomeIcon icon="anchor"/> docked</p>
};

export function shipNavStatusTransform(nav: Nav | undefined): ReactElement | undefined {
    if (!nav) {
        return;
    }
    return elements[nav.status];
}