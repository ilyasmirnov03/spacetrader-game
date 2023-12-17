import {createContext} from 'react';
import {AgentInfoModel} from '../../models/agent-info.model.ts';
import {SignupBody} from '../../models/api-body/signup-body.ts';

interface AuthContextInterface {
    token: string | null,
    agent: AgentInfoModel | undefined,
    login: (token: string, goTo: string) => void,
    logout: () => void,
    signup: (b: SignupBody) => void,
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
    signup: () => {
    },
});