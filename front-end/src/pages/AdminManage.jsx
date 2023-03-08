import { useState } from 'react';
import NavBarManager from '../components/NavBarManager';
import verifyAdminForm from '../helpers/verifyAdminForm';

function AdminManage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState(false);

  const registerUser = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const errorStatus = 409;

    const result = await fetch('http://localhost:3001/register/admin', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: user.token,
      },
      'Access-Control-Allow-Origin': '*',
    });

    if (result.status === errorStatus) return setError(true);

    // const jsonRes = await response.json();
  };

  return (
    <>
      <NavBarManager />
      <div>AdminManage</div>
      <form className="form">
        <p>Nome</p>
        <input
          data-testid="admin_manage__input-name"
          type="text"
          value={ name }
          onChange={ (e) => setName(e.target.value) }
        />
        <p>Email</p>
        <input
          data-testid="admin_manage__input-email"
          type="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <p>Senha</p>
        <input
          data-testid="admin_manage__input-password"
          type="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <p>Tipo</p>
        <select
          data-testid="admin_manage__select-role"
          onChange={ ({ target: { value } }) => setRole(value) }
          value={ role }
        >
          <option value="seller">Vendedor</option>
          <option value="administrator">Admnistrador</option>
          <option value="customer">Consumidor</option>
        </select>
        <button
          type="button"
          data-testid="admin_manage__button-register"
          disabled={ verifyAdminForm(email, name, password) }
          onClick={ registerUser }
        >
          CADASTRAR
        </button>

        { error && (
          <p
            data-testid="admin_manage__element-invalid-register"
          >
            E-mail ou Nome Já Existentes
          </p>
        )}
      </form>
    </>
  );
}

export default AdminManage;
