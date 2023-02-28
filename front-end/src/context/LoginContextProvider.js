import { node } from 'prop-types';
import { useMemo, useState } from 'react';
import LoginContext from './LoginContext';

export default function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  const contextValue = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    user,
    setUser,
  }), [email, password, user]);

  return (
    <LoginContext.Provider value={ contextValue }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: node.isRequired,
};
