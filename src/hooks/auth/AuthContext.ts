import {createContext} from 'react';
import {AgentInfoModel} from '../../models/agent-info.model.ts';

interface AuthContextInterface {
    token: string | null,
    agent: AgentInfoModel | undefined,
    login: (token: string, goTo: string) => void,
    logout: () => void,
    setAgentState: (agent: AgentInfoModel) => void,
}

export const AuthContext = createContext<AuthContextInterface>({
    token: null,
    agent: undefined,
    login: () => {
    },
    logout: () => {
    },
    setAgentState: () => {
    },
});