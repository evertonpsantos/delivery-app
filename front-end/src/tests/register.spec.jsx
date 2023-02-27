import screen from '@testing-library/react';
import render from './helpers/render';

describe('Testando rota /register', () => {
  it('Deve conter o texto Cadastro na tela', () => {
    render('/register');
    const cadastro = screen.getByText('Cadastro');

    expect(cadastro).toBeInTheDocument();
  });
});
