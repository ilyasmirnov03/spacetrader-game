import {FC, FormEvent} from 'react';
import axios from 'axios';
import {url} from '../../../constants/url.const';
import {LocalStorageEnum} from '../../../enum/local-storage.enum';
import {useNavigate} from 'react-router';
import {ApiResponse} from '../../../models/api-response.ts';

interface LoginProps {
}

export const Login: FC<LoginProps> = () => {
    const navigate = useNavigate();

    // Typed token in input
    let token = '';

    function setToken(value: string) {
        token = value;
    }

    function login(e: FormEvent): void {
        e.preventDefault();
        axios.get(`${url}/my/agent`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((data) => {
            localStorage.setItem(LocalStorageEnum.LOGIN_KEY, token);
            localStorage.setItem(LocalStorageEnum.AGENT, JSON.stringify((data.data as ApiResponse).data));
            navigate('/dashboard');
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <div>
            <form onSubmit={login}>
                <input onInput={(e) => setToken(e.currentTarget.value)} type="text" name="token"
                       placeholder="Place or type or token here"/>
                <input type="submit" value={'Login'}/>
            </form>
        </div>
    );
};
