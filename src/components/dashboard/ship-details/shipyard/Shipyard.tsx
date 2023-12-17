import {FC} from 'react';
import {useShip} from '../../../../hooks/ship/useShip.ts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useAuth} from '../../../../hooks/auth/useAuth.tsx';
import {ShipyardShip} from '../../../../models/api-response/shipyard-response.ts';
import {callApi} from '../../../../utils/api/api-caller.ts';
import {ShipPurchaseResponse} from '../../../../models/api-response/ship-purchase-response.ts';
import './shipyard.css';
import {toast} from 'react-toastify';

export const Shipyard: FC = () => {

    const shipContext = useShip();
    const auth = useAuth();

    function buyShip(ship: ShipyardShip): void {
        callApi<ShipPurchaseResponse>('/my/ships/', auth.token, 'post', {
            shipType: ship.type,
            waypointSymbol: shipContext.shipyard?.symbol
        }).then(res => {
            auth.setAgentState(res.data.agent);
            toast.success(`Successful ${res.data.transaction.shipSymbol} purchase`);
        });
    }

    return (
        <article className="w-full">
            <header className="mb-10">
                <h2 className="title-3xl">Shipyard {shipContext.shipyard?.symbol}</h2>
            </header>
            <ul className="flex">
                {shipContext.shipyard?.shipTypes.map(type => (
                    <li key={type.type}>{type.type}</li>
                ))}
            </ul>
            <ul className="longList">
                {shipContext.shipyard?.ships?.map((ship, i) => (
                    <li key={i} className="tab vertical-flex-layout shipyard-ship">
                        <p><b>{ship.type}</b></p>
                        <p>{ship.frame.description}</p>
                        <p><b>{ship.purchasePrice}</b><FontAwesomeIcon icon="coins"/></p>
                        <p><FontAwesomeIcon icon="gas-pump"/> {ship.frame.fuelCapacity}</p>
                        <ul className="shipyard-ship__characteristics">
                            <li>Mounts: {ship.mounts.map(mount => mount.symbol + ' ')}</li>
                            <li>Modules: {ship.modules.map(module => module.symbol + ' ')}</li>
                            <li>Reactor: {ship.reactor.symbol}</li>
                            <li>Engine: {ship.engine.symbol}</li>
                        </ul>
                        <button className="button bottom-anchored"
                                disabled={auth.agent && auth.agent?.credits <= ship.purchasePrice}
                                onClick={() => buyShip(ship)}>
                            Buy
                        </button>
                    </li>
                ))}
            </ul>
        </article>
    );
};