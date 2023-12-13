import {FC} from 'react';
import {useShip} from '../../../../hooks/ship/useShip.ts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const Marketplace: FC = () => {

    const shipContext = useShip();

    function canSell(symbol: string): boolean {
        return Boolean(shipContext.cargo?.inventory.some(inventory => inventory.symbol === symbol));
    }

    return (
        <article className="w-full">
            <h2 className="title-3xl mb-10">{shipContext.marketplace?.symbol} Market</h2>
            <ul className="longList">
                {shipContext.marketplace?.tradeGoods?.map(good => (
                    <li key={good.symbol} className="tab vertical-flex-layout">
                        <p>{good.symbol} - {good.type}</p>
                        <p>Supply: {good.supply}</p>
                        <div className="flex">
                            <p>Sell: {good.sellPrice}<FontAwesomeIcon icon="coins" /></p>
                            {canSell(good.symbol) &&
                                <button className="button" onClick={() => shipContext.sellCargo(good.symbol)}>Sell</button>}
                        </div>
                        <div className="flex">
                            <p>Buy: {good.purchasePrice}<FontAwesomeIcon icon="coins" /></p>
                        </div>
                    </li>
                ))}
            </ul>
        </article>
    )
}