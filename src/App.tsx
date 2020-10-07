import React, { FC } from 'react';
import { Switch, Route } from "react-router-dom";

import { useRealtimeGames } from './game/useRealtimeGames';
import useFirebaseAuth from './auth/useFirebaseAuth';
import { AuthContext } from './auth/AuthContext';
import { HomePage, CADGame, LoginPage } from './pages';

const App: FC = () => {  
  const authContext = useFirebaseAuth();
  console.log(authContext)
  const games = useRealtimeGames();
  
  return (
    <AuthContext.Provider value={authContext}>
      <div className="app">              
              <div id="app__main">
                <Switch>
                  <Route path="/" exact>
                    <HomePage games={games} />
                  </Route> 
                  <Route path="/game/:gameId" exact>
                    <CADGame games={games} />
                  </Route>
                  <Route path="/login">
                    <LoginPage />
                  </Route>

                </Switch>
              </div>
      </div>
    </AuthContext.Provider>      
  );
}

export default App;
