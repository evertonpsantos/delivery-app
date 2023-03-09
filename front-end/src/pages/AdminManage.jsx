import { useEffect, useState } from 'react';
import NavBarManager from '../components/NavBarManager';
import verifyAdminForm from '../helpers/verifyAdminForm';

function AdminManage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const usersFound = await fetch('http://localhost:3001/login/users');
    const resJson = await usersFound.json();

    setUsers(resJson);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

    await fetchUsers();
  };

  const removeItem = async (id) => {
    const filtereredList = users.filter((user) => user.id !== id);
    await fetch(`http://localhost:3001/login/remove/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      'Access-Control-Allow-Origin': '*',
    });
    setUsers(filtereredList);
  };

  return (
    <>
      <NavBarManager />
      <form className="form" style={ { marginTop: '40px' } }>
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

      <p style={ { marginTop: '10px' } }>Lista de Usuários</p>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>

        <tbody>
          { users.map((user, index) => (
            <tr key={ index }>
              <td
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                { index + 1}
              </td>

              <td
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                { user.name }
              </td>

              <td
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                { user.email }
              </td>

              <td
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                { user.role }
              </td>

              <td
                data-testid={ `admin_manage__element-user-table-remove-${index}` }
              >
                <button
                  type="button"
                  onClick={ () => removeItem(user.id) }
                >
                  Remover
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AdminManage;
