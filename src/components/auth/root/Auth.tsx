import {FC} from 'react';
import {useAuth} from '../../../hooks/auth/useAuth.tsx';
import {Link} from 'react-router-dom';
import LoginForm from '../login-form/LoginForm.tsx';
import SignupForm from '../signup-form/SignupForm.tsx';
import './auth.css';

const Auth: FC = () => {
    const auth = useAuth();

    return (
        <div className="flex justify-center wrap p-10">
            <LoginForm/>
            <SignupForm/>
            <div>
                {auth.token && (
                    <>
                        <p>You are already logged in.</p>
                        <Link className="button" to="/dashboard">Go to dashboard</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Auth;