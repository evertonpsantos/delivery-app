import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from './pages/Register';
import OrdersClient from './pages/OrdersClient';
import OrderDetailsClient from './pages/OrderDetailsClient';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import ProviderProduct from './context/ProductProvider';
import Products from './pages/Products';
import LoginProvider from './context/LoginContextProvider';
import OrdersSellers from './pages/OrdersSellers';
import OrderDetailsSeller from './pages/OrderDetailsSeller';
import AdminManage from './pages/AdminManage';

function App() {
  return (
    <LoginProvider>
      <ProviderProduct>
        <Switch>
          <Route path="/register" component={ Register } />
          <Route exact path="/customer/checkout" component={ Checkout } />
          <Route path="/customer/products" component={ Products } />
          <Route exact path="/customer/orders" component={ OrdersClient } />
          <Route exact path="/seller/orders" component={ OrdersSellers } />
          <Route exact path="/admin/manage" component={ AdminManage } />
          <Route exact path="/customer/orders/:id" component={ OrderDetailsClient } />
          <Route exact path="/seller/orders/:id" component={ OrderDetailsSeller } />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={ Login } />
        </Switch>
      </ProviderProduct>
    </LoginProvider>
  );
}

export default App;
