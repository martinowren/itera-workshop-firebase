import React, { FC } from 'react';
import firebase from 'firebase';
import { Switch, Route } from "react-router-dom";

import useFirebaseAuth from './auth/useFirebaseAuth';
import AuthContext from './auth/AuthContext';
import { Navigation } from './components';
import { Home } from './pages';

const App: FC = () => {  
  const authContext = useFirebaseAuth();
  
  return (
    <div className="App">
      <AuthContext.Provider value={authContext}>
            <div id="content">

              <Navigation />

              <Switch>

                <Route path="/" exact component={Home} /> 
              
              </Switch>
            </div>
      </AuthContext.Provider>      
    </div>
  );
}

export default App;
