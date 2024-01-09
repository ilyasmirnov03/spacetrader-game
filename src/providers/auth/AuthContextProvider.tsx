import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { LocalStorageEnum } from '../../enum/local-storage.enum.ts';
import { AuthContext } from '../../hooks/auth/AuthContext.ts';
import { AgentInfoModel } from '../../models/agent-info.model.ts';
import { callApi } from '../../utils/api/api-caller.ts';
import { SignupBody } from '../../models/api-body/signup-body.ts';
import { RegisterResponse } from '../../models/api-response/register-response.ts';

interface AuthContextProviderProps {
    readonly children: ReactElement;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [token, setToken] = useState<string | null>(localStorage.getItem(LocalStorageEnum.LOGIN_KEY));
    const [agent, setAgent] = useState<AgentInfoModel>();

    const navigate = useNavigate();

    const redirectFromPathname = useCallback(
        (path: string) => {
            if (path === '/') {
                navigate('/dashboard');
            } else {
                navigate(path);
            }
        }, [navigate]
    );

    // Get agent using token in arguments
    const login = useCallback((typedToken: string, goTo: string = window.location.pathname) => {
        callApi<AgentInfoModel>('/my/agent', typedToken)
            .then((res) => {
                localStorage.setItem(LocalStorageEnum.LOGIN_KEY, typedToken);
                if (token == null) {
                    setToken(typedToken);
                }
                setAgent(res.data);
                redirectFromPathname(goTo);
            });
    }, [redirectFromPathname, token]);

    function logout(): void {
        localStorage.clear();
        setToken(null);
        setAgent(undefined);
        navigate('/login');
    }

    function setAgentState(agent: AgentInfoModel): void {
        setAgent(agent);
    }

    function signup(body: SignupBody): void {
        callApi<RegisterResponse>('/register', token, 'post', body)
            .then(res => {
                setAgent(res.data.agent);
                setToken(res.data.token);
                localStorage.setItem(LocalStorageEnum.LOGIN_KEY, res.data.token);
                navigate('/dashboard');
            })
    }

    const attemptToAutoLogin = useCallback(() => {
        if (token && !agent) {
            login(token);
        } else if (!token) {
            navigate('/login');
        }
    }, [login, agent, token, navigate]);

    useEffect(() => {
        attemptToAutoLogin();
    }, [attemptToAutoLogin]);

    return <AuthContext.Provider value={{
        token,
        login,
        agent,
        logout,
        setAgentState,
        signup,
    }}>
        {children}
    </AuthContext.Provider>;
}