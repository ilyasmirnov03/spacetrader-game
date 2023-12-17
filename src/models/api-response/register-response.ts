import {AgentInfoModel} from '../agent-info.model.ts';

export interface RegisterResponse {
    agent: AgentInfoModel;
    token: string;
}