import React, { FC } from 'react';
import firebase from 'firebase';
import { Switch, Route } from "react-router-dom";

import { useRealtimeGames } from './game/useRealtimeGames';
import useFirebaseAuth from './auth/useFirebaseAuth';
import { AuthContext } from './auth/AuthContext';
import { Navigation } from './components';
import { Home, Game } from './pages';

const App: FC = () => {  
  const authContext = useFirebaseAuth();

  const games = useRealtimeGames();
  
  return (
    <AuthContext.Provider value={authContext}>
      <div className="app">
              <Navigation />
              
              <div id="app__main">
                <Switch>
                  <Route path="/" exact>
                    <Home games={games} />
                  </Route> 
                  <Route path="/game/:gameId" exact>
                    <Game games={games} />
                  </Route>

                </Switch>
              </div>
      </div>
    </AuthContext.Provider>      
  );
}

export default App;
