import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import Navbar from '../components/NavBar';
import ContextProduct from '../context/ProductContext';

export default function Checkout() {
  const { setCart } = useContext(ContextProduct);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const [sellerChosenId, setSellerChosenId] = useState(null);

  const cartItems = JSON.parse(localStorage.getItem('carrinho'));
  const history = useHistory();

  useEffect(() => {
    const fetchSellers = async () => {
      const sellersFound = await fetch('http://localhost:3001/login/sellers');
      const resJson = await sellersFound.json();

      setSellers(resJson);
      setSellerChosenId(resJson[0].id);
    };

    fetchSellers();
  }, []);

  const removeItem = (id) => {
    const findElement = cartItems.find((item) => item.id === id);
    const filtereredList = cartItems.filter((item) => item !== findElement);
    localStorage.setItem('carrinho', JSON.stringify(filtereredList));
    setCart(filtereredList);
  };

  const handleOrder = async () => {
    // const user = JSON.parse(localStorage.getItem('user'));
    const user = {
      id: 1,
      token: 'BLAJBLJBA.BALNAJJALNL.BAABLABLA',
    };

    const saleInfo = {
      userId: Number(user.id),
      sellerId: Number(sellerChosenId),
      totalPrice: Number(cartItems
        .reduce((acc, curr) => (curr.price * curr.quantity) + acc, 0)),
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      cartItems,
    };

    const result = await fetch('http://localhost:3001/sales', {
      method: 'POST',
      body: JSON.stringify(saleInfo),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: user.token,
      },
      'Access-Control-Allow-Origin': '*',
    });
    const resultToJson = await result.json();

    history.push(`/customer/orders/${resultToJson.id}`);
  };

  return (
    <div>
      <Navbar />
      {cartItems.length === 0 ? <p>Não há items ainda</p> : (
        <div>
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
                onChange={ ({ target: { value } }) => setSellerChosenId(value) }
                value={ sellerChosenId }
              >
                { sellers.map((seller) => (
                  <option key={ seller.name } value={ seller.id }>{seller.name}</option>
                ))}
              </select>
            </label>

            <label htmlFor="input-address">
              Endereço:
              <input
                type="text"
                name="input-address"
                data-testid="customer_checkout__input-address"
                value={ address }
                onChange={ ({ target: { value } }) => setAddress(value) }
              />
            </label>

            <label htmlFor="input-number">
              Número:
              <input
                type="text"
                name="input-number"
                data-testid="customer_checkout__input-number"
                value={ addressNumber }
                onChange={ ({ target: { value } }) => setAddressNumber(value) }
              />
            </label>

            <button
              type="button"
              data-testid="customer_checkout__button-submit-order"
              onClick={ handleOrder }
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
