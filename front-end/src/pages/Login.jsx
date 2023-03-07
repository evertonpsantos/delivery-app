import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import verifyLoginInfo from '../helpers/verifyLoginInfo';

function Login() {
  const { email, setEmail, password, setPassword,
    setUser, user } = useContext(LoginContext);
  const [invalidUser, setInvalidUser] = useState(false);
  const history = useHistory();

  const CUSTOMER_ROUTE = '/customer/products';

  useEffect(() => {
    const stor = JSON.parse(localStorage.getItem('user'));
    if (stor) {
      if (stor.role === 'customer') {
        history.push(CUSTOMER_ROUTE);
      }
      if (stor.role === 'seller') {
        history.push('/seller/orders');
      }
      if (stor.role === 'administrator') {
        history.push('/admin/manage');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitButton = async () => {
    const loginData = { email, password };
    const status404 = 404;

    const result = await fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      'Access-Control-Allow-Origin': '*',
    });

    if (result.status === status404) return setInvalidUser(true);

    const jsonResult = await result.json();

    setUser(jsonResult);
    switch (jsonResult.role) {
    case 'administrator':
      history.push('/admin/manage');
      break;
    case 'seller':
      history.push('/seller/orders');
      break;
    case 'customer':
      localStorage.setItem('user', JSON.stringify(user));
      history.push(CUSTOMER_ROUTE);
      break;
    default:
      break;
    }
    localStorage.setItem('user', JSON.stringify(jsonResult));
  };

  function toRegister() {
    history.push('/register');
  }

  return (
    <div>
      <form>
        <label htmlFor="login-email">
          Login
          <input
            name="login-email"
            data-testid="common_login__input-email"
            placeholder="E-mail"
            type="email"
            onChange={ ({ target: { value } }) => setEmail(value) }
            value={ email }
          />
        </label>

        <label htmlFor="login-senha">
          Senha
          <input
            name="login-senha"
            data-testid="common_login__input-password"
            placeholder="Senha"
            type="password"
            onChange={ ({ target: { value } }) => setPassword(value) }
            value={ password }
          />
        </label>

        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ verifyLoginInfo(email, password) }
          onClick={ handleSubmitButton }
        >
          Login
        </button>

        <button
          onClick={ toRegister }
          type="button"
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>

        { invalidUser && (
          <p data-testid="common_login__element-invalid-email">E-mail Inválido</p>
        )}

      </form>
    </div>
  );
}

export default Login;
