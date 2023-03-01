import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginProvider from './context/LoginContextProvider';
import Login from './pages/Login';
import Checkout from './pages/Checkout';

function App() {
  return (
    <LoginProvider>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/customer/checkout" component={ Checkout } />
      </Switch>
    </LoginProvider>
  );
}

export default App;
