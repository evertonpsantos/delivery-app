import React, { useEffect, useState } from 'react';
import '../styles/navBarCustomer.css';
import { Link } from 'react-router-dom';

function NavBar() {
  const [userName, setUserName] = useState('');

  const logout = () => {
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const getUserName = () => {
      const user = JSON.parse(localStorage.getItem('user')) || '';
      if (user) {
        setUserName(user.name);
      }
    };

    getUserName();
  }, []);

  return (
    <nav className="navbar">
      <div className="left_side">
        <div
          className="navbar_produtos"
        >
          <Link
            data-testid="customer_products__element-navbar-link-products"
            to="/customer/products"
          >
            PRODUTOS
          </Link>
        </div>
        <div
          className="navbar_pedidos"
        >
          <Link
            data-testid="customer_products__element-navbar-link-orders"
            to="/customer/orders"
          >
            MEUS PEDIDOS
          </Link>
        </div>

      </div>

      <div className="right_side">
        <div
          className="navbar_nome"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { userName }
        </div>

        <div className="navbar_sair">
          <Link
            to="/login"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => logout() }
          >
            Sair
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
