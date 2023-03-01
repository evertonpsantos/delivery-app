import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginProvider from './context/LoginContextProvider';
import Login from './pages/Login';
import ProviderProduct from './context/ProductProvider';
import Products from './pages/Products';

function App() {
  return (
    <LoginProvider>
      <ProviderProduct>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/customer/products" component={ Products } />
        </Switch>
      </ProviderProduct>
    </LoginProvider>
  );
}

export default App;
