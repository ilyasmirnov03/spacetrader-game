import { FC, FormEvent } from 'react';
import {useAuth} from '../../../hooks/auth/useAuth.tsx';

interface LoginProps {
}

export const Login: FC<LoginProps> = () => {
    const auth = useAuth();

    // Typed token in input
    let token = '';

    function setToken(value: string) {
        token = value;
    }

    function login(e: FormEvent): void {
        e.preventDefault();
        auth.login(token, '/');
    }

    return (
        <div>
            <form onSubmit={login}>
                <input onInput={(e) => setToken(e.currentTarget.value)} type="text" name="token"
                    placeholder="Place or type or token here" />
                <input type="submit" value={'Login'} />
            </form>
        </div>
    );
};
