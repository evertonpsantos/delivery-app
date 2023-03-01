import React, { useContext } from 'react';
import LoginContext from '../context/LoginContext';
import '../styles/navBarCustomer.css';

function NavBar() {
  const { user } = useContext(LoginContext);
  console.log(user);

  const logout = () => {
    localStorage.removeItem('user');
    console.log('storage excluido');
  };

  const getUserName = () => {
    const userName = JSON.parse(localStorage.getItem('user')) || '';
    if (userName) {
      return userName.name;
    }
  };
  return (
    <nav className="navbar">
      <div className="left_side">
        <div
          className="navbar_produtos"
        >
          <a
            data-testid="customer_products__element-navbar-link-products"
            href="/customer/products"
          >
            PRODUTOS
          </a>
        </div>
        <div
          className="navbar_pedidos"
        >
          <a
            data-testid="customer_products__element-navbar-link-orders"
            href="/customer/products"
          >
            MEUS PEDIDOS
          </a>
        </div>

      </div>

      <div className="right_side">
        <div
          className="navbar_nome"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { getUserName() }
        </div>

        <div className="navbar_sair">
          <a
            href="/login"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => logout() }
          >
            Sair
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
