import {useAuth} from '../../../hooks/auth/useAuth.tsx';
import {FormEvent} from 'react';
import {SignupBody} from '../../../models/api-body/signup-body.ts';

const SignupForm = () => {

    const auth = useAuth();

    const signupBody: SignupBody = {
        symbol: '',
        faction: '',
    };

    function setSignupBodyValue(key: keyof SignupBody, value: string) {
        signupBody[key] = value;
        if (key === 'email' && value === '') {
            delete signupBody.email;
        }
    }

    function signup(e: FormEvent): void {
        e.preventDefault();
        console.log((e.currentTarget as HTMLFormElement).checkValidity());
        if ((e.currentTarget as HTMLFormElement).checkValidity()) {
            auth.signup(signupBody);
        }
    }

    return (
        <form onSubmit={signup} className="vertical-flex-layout">
            <input type="text" name="symbol" min={3} max={14}
                   onInput={(e) => setSignupBodyValue('symbol', e.currentTarget.value)}
                   placeholder="New agent's name"
                   className="input" required={true}/>
            <input type="text" name="faction" placeholder="Faction" className="input"
                   onInput={(e) => setSignupBodyValue('faction', e.currentTarget.value)}
                   required={true}/>
            <input type="email" name="email" placeholder="Email" className="input"
                   onInput={(e) => setSignupBodyValue('email', e.currentTarget.value)}
                   required={false}/>
            <input type="submit" className="button" value="Sign up"/>
        </form>
    );
};

export default SignupForm;