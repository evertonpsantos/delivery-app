import { useContext } from 'react';
import LoginContext from '../context/LoginContext';
import verifyLoginInfo from '../helpers/verifyLoginInfo';

function Login() {
  const { email, setEmail, password, setPassword } = useContext(LoginContext);

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
        >
          Login
        </button>

        <button type="button" data-testid="common_login__button-register">
          Ainda não tenho conta
        </button>

        <p data-testid="common_login__element-invalid-email">E-mail inválido</p>
      </form>
    </div>
  );
}

export default Login;
