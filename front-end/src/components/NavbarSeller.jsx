import React from 'react';
// import LoginContext from '../context/LoginContext';
import '../styles/navBarCustomer.css';
import { Link } from 'react-router-dom';

function NavbarSeller() {
  // const { user } = useContext(LoginContext);

  const logout = () => {
    localStorage.removeItem('user');
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
          <Link
            data-testid="customer_products__element-navbar-link-orders"
            to="/seller/orders"
          >
            PEDIDOS
          </Link>
        </div>
        <div
          className="navbar_pedidos"
        >
          <Link
            to="/customer/orders"
            hidden
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
          { getUserName() }
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

export default NavbarSeller;
