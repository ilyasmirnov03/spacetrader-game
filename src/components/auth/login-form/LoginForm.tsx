import {FormEvent} from 'react';
import {useAuth} from '../../../hooks/auth/useAuth.tsx';

const LoginForm = () => {
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

    return <form onSubmit={login} className="vertical-flex-layout">
        <textarea onInput={(e) => setToken(e.currentTarget.value)} name="token"
               placeholder="Place or type or token here" className="input"/>
        <input type="submit" className="button" value="Login"/>
    </form>;
};

export default LoginForm;