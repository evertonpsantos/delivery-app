import React, { useContext, useEffect, useState } from 'react';
import '../styles/registerPage.css';
import { useHistory } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

function Register() {
  const { setUser } = useContext(LoginContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHidden, setIsHidden] = useState(true);
  const [erro, setErro] = useState('');
  const [button, setButton] = useState(true);

  const history = useHistory();
  const NAME_LENGTH = 12;
  const VERIFY_EMAIL = (testEmail) => /\S+@\S+\.\S+/.test(testEmail);
  const PASSWORD_LENGTH = 6;
  const STATUS409 = 409;

  useEffect(() => {
    if (name.length < NAME_LENGTH) {
      setErro('Quantidade de caracteres menor que 12');
    } else if (!(VERIFY_EMAIL(email))) {
      setErro('Digite um email válido');
    } else if (password.length < PASSWORD_LENGTH) {
      setErro('Senha menor que 6 dígitos');
    } else {
      setButton(false);
    }
  }, [name, email, password]);

  async function register() {
    const registerData = { name, email, password };

    try {
      const responseFetch = await fetch('http://localhost:3001/register', {
        method: 'POST',
        body: JSON.stringify(registerData),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        'Access-Control-Allow-Origin': '*',
      });
      const json = await responseFetch.json();
      if (responseFetch.status === STATUS409) {
        throw new Error(json.message);
      }
      localStorage.setItem('user', JSON.stringify(json));
      history.push('/customer/products');
      setUser(json);
    } catch (error) {
      setErro(error.message);
      setIsHidden(false);
    }
  }

  return (
    <main>
      <div className="container">
        <h1>Cadastro</h1>
        <form className="form">
          <p className="bg-form">Nome</p>
          <input
            data-testid="common_register__input-name"
            type="text"
            id="field-name"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
          <p className="bg-form">Email</p>
          <input
            data-testid="common_register__input-email"
            type="email"
            id="field-email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
          <p className="bg-form">Senha</p>
          <input
            data-testid="common_register__input-password"
            type="password"
            id="field-password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
          <button
            className="button"
            type="button"
            data-testid="common_register__button-register"
            onClick={ register }
            disabled={ button }
          >
            CADASTRAR
          </button>
        </form>
        <p
          data-testid="common_register__element-invalid_register"
          className="erro"
          hidden={ isHidden }
        >
          { erro }
        </p>
      </div>
    </main>
  );
}

export default Register;
