function Login() {
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
          />
        </label>

        <label htmlFor="login-senha">
          Senha
          <input
            name="login-senha"
            data-testid="common_login__input-password"
            placeholder="Senha"
            type="password"
          />
        </label>

        <button type="button" data-testid="common_login__button-login">Login</button>

        <button type="button" data-testid="common_login__button-register">
          Ainda não tenho conta
        </button>

        <p data-testid="common_login__element-invalid-email">E-mail inválido</p>
      </form>
    </div>
  );
}

export default Login;
