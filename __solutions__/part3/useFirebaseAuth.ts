import { useEffect, useState, useCallback } from 'react';
import firebase from 'firebase';

import { AuthContextType, initialAuthContext } from './AuthContext';

function useFirebaseAuth() {
  const [authContext, setAuthContext] = useState<AuthContextType>(
    initialAuthContext
  );

  const login = useCallback(async (username) => {
    let authResult: firebase.auth.UserCredential;

    try {
      const provider = new firebase.auth.GithubAuthProvider();
      authResult = await firebase.auth().signInWithPopup(provider);

      // No need to go further change above.
      var user = firebase.auth().currentUser;

      if (user !== null) {
        await user.updateProfile({
          displayName: username,
        });
        console.log('Logged in with: ' + user.displayName);
      }

      setAuthContext((state) =>
        Object.assign({}, state, {
          user: authResult.user,
          isLoggedIn: true,
        })
      );
    } catch (error) {
      console.error('Login error: ', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setAuthContext((state) =>
          Object.assign({}, state, {
            user: null,
            isLoggedIn: false,
          })
        );
      })
      .catch((error) => {
        console.error('Logout failed with error: ', error);
        throw error;
      });
  }, []);

  /** Add login, logout and state update methods to context */
  useEffect(() => {
    setAuthContext((state) =>
      Object.assign({}, state, {
        login,
        logout,
      })
    );
  }, [login, logout]);

  /** Check if the user is already logged in and initiate the auth context on mount */
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthContext({
          user,
          isLoggedIn: true,
          login,
          logout,
        });
      } else {
        console.error(
          'No valid cookie present, the user needs to log in again.'
        );
      }
    });
  }, [login, logout]);

  return authContext;
}

export default useFirebaseAuth;
