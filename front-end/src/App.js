import React from 'react';
import './App.css';
import Provider from './contexts/myProvider';
import Products from './pages/Products';

function App() {
  return (
    <Provider>
      <Products />
    </Provider>
  );
}

export default App;
