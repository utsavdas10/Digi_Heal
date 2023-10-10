import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Auth from './Auth/Auth';
import Home from './Home/Home';
import Workouts from './Workouts/Workouts';
import Metrics from './Metrics/Metrics';
import Progress from './Progress/Progress';
import Nutritions from './Nutritions/Nutritions';
import Login from './components/login';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/components/hooks/auth-hook';

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact> <Home /> </Route>
        <Route path="/workouts"> <Workouts /> </Route>
        <Route path="/login"> <Login /> </Route>
        <Route path="/metrics"> <Metrics /> </Route>
        <Route path="/progress"> <Progress /> </Route>
        <Route path="/nutrition"> <Nutritions /> </Route>
        <Redirect to="/" />
      </Switch>
    );
  } 
  else {
    routes = (
      <Switch>
        <Route path="/" exact> <Home /> </Route>
        <Route path="/auth"> <Auth /> </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
          <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
