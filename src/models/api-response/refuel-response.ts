import { AgentInfoModel } from "../agent-info.model";
import { Transaction } from "../market.model";
import { FuelModel } from "../ship.model";

export interface RefuelResponse {
    agent: AgentInfoModel;
    fuel: FuelModel;
    transaction: Transaction;
}