import {ReactElement, useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import axios from 'axios';
import {LocalStorageEnum} from '../../enum/local-storage.enum.ts';
import {ApiResponse} from '../../models/api-response.ts';
import {AuthContext} from '../../hooks/auth/AuthContext.ts';
import {url} from '../../constants/url.const.ts';
import {AgentInfoModel} from '../../models/agent-info.model.ts';

interface AuthContextProviderProps {
    children: ReactElement;
}

export function AuthContextProvider({children}: AuthContextProviderProps) {
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
        axios.get(`${url}/my/agent`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${typedToken}`
            },
        }).then((data) => {
            localStorage.setItem(LocalStorageEnum.LOGIN_KEY, typedToken);
            if (token == null) {
                setToken(typedToken);
            }
            setAgent((data.data as ApiResponse).data as AgentInfoModel);
            redirectFromPathname(goTo);
        }).catch(err => {
            console.error(err);
        });
    }, [redirectFromPathname, token]);

    function logout(): void {
        localStorage.clear();
        setToken(null);
        setAgent(undefined);
        navigate('/login');
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
        logout,
        agent
    }}>
        {children}
    </AuthContext.Provider>;
}