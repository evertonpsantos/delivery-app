import { useContext } from 'react';
import Navbar from '../components/NavBar';
import ContextProduct from '../context/ProductContext';

export default function Checkout() {
  const { setCart } = useContext(ContextProduct);

  const cartItems = JSON.parse(localStorage.getItem('carrinho'));

  const removeItem = (id) => {
    const findElement = cartItems.find((item) => item.id === id);
    const filtereredList = cartItems.filter((item) => item !== findElement);
    localStorage.setItem('carrinho', JSON.stringify(filtereredList));
    setCart(filtereredList);
  };

  return (
    <div>
      {cartItems.length === 0 ? <p>Não há items ainda</p> : (
        <div>
          <Navbar />
          <p>Finalizar Pedido</p>
          <table style={ { marginTop: '100px' } }>
            <thead>
              <tr>
                <th>Item</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Sub-total</th>
                <th>Remove Item</th>
              </tr>
            </thead>

            <tbody>
              { cartItems.map((item, index) => (
                <tr key={ index }>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}
                  </td>
                  <td
                    data-testid={ `customer_checkout__element-order-table-name-${index}` }
                  >
                    {item.name}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${index}`
                    }
                  >
                    {item.quantity}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${index}`
                    }
                  >
                    {item.price}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${index}`
                    }
                  >
                    {(item.quantity * item.price).toFixed(2)}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                  >
                    <button
                      type="button"
                      onClick={ () => removeItem(item.id) }
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p
            data-testid="customer_checkout__element-order-total-price"
          >
            {`Total: ${cartItems
              .reduce((acc, curr) => (curr.price * curr.quantity) + acc, 0)}`}
          </p>

          <div>
            <p>Detalhes e Endereço para Entrega</p>

            <label htmlFor="seller-select">
              P. Vendedora Responsável:
              <select
                name="seller-select"
                data-testid="customer_checkout__select-seller"
              >
                P. Vendedora Responsavel:
                <option>Fulana de Tal</option>
              </select>
            </label>

            <label htmlFor="input-address">
              Endereço:
              <input
                type="text"
                name="input-address"
                data-testid="customer_checkout__input-address"
              />
            </label>

            <label htmlFor="input-number">
              Número:
              <input
                type="text"
                name="input-number"
                data-testid="customer_checkout__input-number"
              />
            </label>

            <button
              type="button"
              data-testid="customer_checkout__button-submit-order"
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
