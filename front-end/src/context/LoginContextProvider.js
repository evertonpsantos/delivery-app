import { node } from 'prop-types';
import { useMemo } from 'react';
import LoginContext from './LoginContext';

export default function LoginProvider({ children }) {
  const name = '';

  const contextValue = useMemo(() => ({
    name,
  }), []);

  return (
    <LoginContext.Provider value={ contextValue }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: node.isRequired,
};
