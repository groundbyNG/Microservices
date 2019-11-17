import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Transaction from './Transaction';
import SignUp from './SignUp';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            <Route path="/" exact>
              <Login />
            </Route>
            <PrivateRoute path="/transaction" exact>
              <Transaction />
            </PrivateRoute>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
