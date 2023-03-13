import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import Navbar from '../components/NavBar';
import ContextProduct from '../context/ProductContext';
import '../styles/checkout.css';

export default function Checkout() {
  const { setCart, total } = useContext(ContextProduct);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const [sellerChosenId, setSellerChosenId] = useState(null);

  const cartItems = JSON.parse(localStorage.getItem('carrinho'))
    .filter(({ quantity }) => quantity !== 0);
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
    const findElement = cartItems.find((item) => item.id === Number(id));
    const filtereredList = cartItems.filter((item) => item !== findElement);
    localStorage.setItem('carrinho', JSON.stringify(filtereredList));
    setCart(filtereredList);
  };

  const handleOrder = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

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
    localStorage.removeItem('carrinho');
    setCart([]);
  };

  return (
    <div className="checkout">
      <Navbar />
      <p className="checkout-titles" style={ { marginTop: 100 } }>Finalizar Pedido</p>
      {cartItems.length === 0 ? <p>Não há items ainda</p> : (
        <div className="container-table">
          <table>
            <thead className="table-head">
              <tr>
                <th>Item</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Sub-total</th>
                <th>Remove Item</th>
              </tr>
            </thead>

            <tbody className="table-body">
              { cartItems.map((item, index) => (
                <tr key={ index } className="table-body-row">
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${index}`
                    }
                    className="client-details-order-page-number-product"
                  >
                    {index + 1}
                  </td>
                  <td
                    data-testid={ `customer_checkout__element-order-table-name-${index}` }
                    className="client-details-order-page-description-product"
                  >
                    {item.name}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${index}`
                    }
                    className="client-details-order-page-quantity-product"
                  >
                    {item.quantity}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${index}`
                    }
                    className="client-details-order-page-unit-value-product"
                  >
                    {String(item.price).replace('.', ',')}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${index}`
                    }
                    className="checkout-sub-total-product"
                  >
                    {String((item.quantity * item.price).toFixed(2)).replace('.', ',')}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                    className="checkout-remove-item-button-container"
                  >
                    <button
                      type="button"
                      onClick={ () => removeItem(item.id) }
                      className="checkout-remove-item-button"
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
            className="checkout-total-price"
          >
            {`Total: ${String(total).replace('.', ',')}`}
          </p>
        </div>
      )}

      <p className="checkout-titles">Detalhes e Endereço para Entrega</p>
      <div className="checkout-form">
        <div className="checkout-select">
          <p>P. Vendedora Responsável:</p>
          <select
            name="seller-select"
            data-testid="customer_checkout__select-seller"
            onChange={ ({ target: { value } }) => setSellerChosenId(value) }
            value={ sellerChosenId }
            className="checkout-select-input"
          >
            { sellers.map((seller) => (
              <option key={ seller.name } value={ seller.id }>{seller.name}</option>
            ))}
          </select>
        </div>

        <div className="checkout-input-address">
          <p>Endereço:</p>
          <input
            type="text"
            name="input-address"
            placeholder="Avenida das Dores"
            data-testid="customer_checkout__input-address"
            value={ address }
            onChange={ ({ target: { value } }) => setAddress(value) }
          />
        </div>

        <div className="checkout-input-number">
          <p>Número:</p>
          <input
            type="text"
            name="input-number"
            placeholder="123"
            data-testid="customer_checkout__input-address-number"
            value={ addressNumber }
            onChange={ ({ target: { value } }) => setAddressNumber(value) }
          />
        </div>
      </div>

      <div className="button-checkout-container">
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleOrder }
          className="button-checkout"
        >
          FINALIZAR PEDIDO
        </button>
      </div>
    </div>
  );
}
