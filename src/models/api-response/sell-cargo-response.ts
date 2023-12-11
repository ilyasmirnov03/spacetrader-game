import {AgentInfoModel} from '../agent-info.model.ts';
import {Cargo} from '../ship.model.ts';
import {Transaction} from '../market.model.ts';

export interface SellCargoResponse {
    agent: AgentInfoModel;
    cargo: Cargo;
    transaction: Transaction;
}