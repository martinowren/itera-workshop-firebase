import React from 'react';
import firebase from 'firebase';
import { User } from '../types';

export type AuthContextType = {
    user: firebase.User | null;
    isLoggedIn?: boolean;
    login?: () => Promise<void>;
    logout?: () => Promise<void>;
}

export const initialAuthContext: AuthContextType = {
    user: null,
    isLoggedIn: undefined,
    login: undefined,
    logout: undefined,
};

export const AuthContext = React.createContext<AuthContextType>(initialAuthContext);

export function useAuth() {
    return React.useContext(AuthContext);
}