import {useContext} from 'react';
import {AuthContext} from './AuthContext.ts';

export function useAuth() {
    return useContext(AuthContext);
}