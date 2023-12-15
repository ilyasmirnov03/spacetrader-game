import {AgentInfoModel} from '../agent-info.model.ts';
import {ShipTransaction} from '../ship-transaction.ts';
import {ShipModel} from '../ship.model.ts';

export interface ShipPurchaseResponse {
    agent: AgentInfoModel;
    ship: ShipModel;
    transaction: ShipTransaction;
}