import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../../App';

function rendering(rota) {
  render(
    <MemoryRouter initialEntries={ [rota] }>
      <App />
    </MemoryRouter>,
  );
}

export default rendering;
