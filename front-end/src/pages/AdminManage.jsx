import { useEffect, useState } from 'react';
import NavBarManager from '../components/NavBarManager';
import verifyAdminForm from '../helpers/verifyAdminForm';
import '../styles/adminManage.css';

function AdminManage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  const selectTypes = [{
    name: 'Consumidor',
    value: 'customer',
  }, {
    name: 'Administrador',
    value: 'administrator',
  }, {
    name: 'Vendedor',
    value: 'seller',
  }];

  const tableHeads = ['Item', 'Nome', 'E-mail', 'Tipo', 'Excluir'];

  const applicationJson = 'application/json';

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
        'Content-Type': applicationJson,
        Accept: applicationJson,
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
        'Content-Type': applicationJson,
        Accept: applicationJson,
      },
      'Access-Control-Allow-Origin': '*',
    });
    setUsers(filtereredList);
  };

  return (
    <>
      <NavBarManager />
      <p
        className="admin-title"
        style={ { marginTop: '100px' } }
      >
        Cadastrar Novo Usuário
      </p>

      <div className="admin-form-container">
        <form>
          <div className="admin-input">
            <p>Nome</p>
            <input
              data-testid="admin_manage__input-name"
              type="text"
              value={ name }
              onChange={ (e) => setName(e.target.value) }
            />
          </div>

          <div className="admin-input">
            <p>Email</p>
            <input
              data-testid="admin_manage__input-email"
              type="email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }

            />
          </div>

          <div className="admin-input">
            <p>Senha</p>
            <input
              data-testid="admin_manage__input-password"
              type="password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
          </div>

          <div className="admin-input">
            <p>Tipo</p>
            <select
              data-testid="admin_manage__select-role"
              onChange={ ({ target: { value } }) => setRole(value) }
              value={ role }
              className="admin-select-type"
            >
              { selectTypes.map((type, index) => (
                <option
                  key={ `${type + index}` }
                  value={ type.value }
                >
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-register-button-container">
            <button
              type="button"
              data-testid="admin_manage__button-register"
              disabled={ verifyAdminForm(email, name, password) }
              onClick={ registerUser }
              className={
                verifyAdminForm(email, name, password)
                  ? 'admin-register-button-disabled'
                  : 'admin-register-button'
              }
            >
              CADASTRAR
            </button>
          </div>

          { error && (
            <p
              data-testid="admin_manage__element-invalid-register"
              className="erro"
            >
              E-mail ou Nome Já Existentes
            </p>
          )}
        </form>
      </div>

      <p
        className="admin-title"
        style={ { marginTop: '10px' } }
      >
        Lista de Usuários
      </p>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              {tableHeads.map((head, index) => (
                <th key={ index }>{head}</th>
              ))}
              {/* <th>Item</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Tipo</th>
              <th>Excluir</th> */}
            </tr>
          </thead>

          <tbody>
            { users.map((user, index) => (
              <tr key={ `${index} ${user.name}` } className="table-row">
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                  className="admin-user-number"
                >
                  { index + 1}
                </td>

                <td
                  data-testid={ `admin_manage__element-user-table-name-${index}` }
                  className="admin-user-name"
                >
                  { user.name }
                </td>

                <td
                  data-testid={ `admin_manage__element-user-table-email-${index}` }
                  className="admin-user-email"
                >
                  { user.email }
                </td>

                <td
                  data-testid={ `admin_manage__element-user-table-role-${index}` }
                  className="admin-user-role"
                >
                  { user.role }
                </td>

                <td
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  className="checkout-remove-item-button-container"
                >
                  <button
                    type="button"
                    onClick={ () => removeItem(user.id) }
                    className="admin-remove-item-button"
                  >
                    Remover
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminManage;
