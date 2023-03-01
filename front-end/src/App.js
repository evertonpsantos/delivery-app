import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from './pages/Register';
import Customer from './pages/Customer';
import Login from './pages/Login';
import LoginProvider from './context/LoginContextProvider';

function App() {
  return (
    <LoginProvider>
      <Switch>
        <Route path="/register" component={ Register } />
        <Route path="/customer/products" component={ Customer } />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={ Login } />
      </Switch>
    </LoginProvider>
  );
}

export default App;
