import React, { useContext } from 'react';

import context from '../contexts/myContext';

function NavBar() {
  const { valuesLogin } = useContext(context);
  const { name } = valuesLogin;
  return (
    <ul>
      <li data-testid="customer_products__element-navbar-link-products">
        Produtos

      </li>
      <li data-testid="customer_products__element-navbar-link-orders">
        Meus Pedidos
      </li>
      <li data-testid="customer_products__element-navbar-user-full-name">
        {name || 'userName'}
      </li>
      <li data-testid="customer_products__element-navbar-link-logout">
        Sair
      </li>
    </ul>
  );
}

export default NavBar;
