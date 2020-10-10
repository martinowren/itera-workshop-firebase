import React from 'react';
import firebase from 'firebase';

export type AuthContextType = {
  user: firebase.User | null;
  isLoggedIn: boolean;
  login?: (username: string) => Promise<void>;
  logout?: () => Promise<void>;
};

export const initialAuthContext: AuthContextType = {
  user: null,
  isLoggedIn: false,
  login: undefined,
  logout: undefined,
};

export const AuthContext = React.createContext<AuthContextType>(
  initialAuthContext
);

export function useAuth() {
  return React.useContext(AuthContext);
}
