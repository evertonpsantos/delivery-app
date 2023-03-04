import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../helpers/fetchData';
import translateDatetimeToDate from '../helpers/translateDatetimeToDate';
import '../styles/orderDetails.css';
import NavBar from '../components/NavBar';

function OrderDetails() {
  const [orders, setOrders] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const myOrders = await fetchData(`http://localhost:3001/salesproducts/${id}`);
      const date = translateDatetimeToDate(myOrders);
      setOrders(date);
    };

    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (orders.length < 1) return <div>Loading...</div>;

  return (
    <main className="main-order-details">
      <NavBar />
      <h2>Detalhes do pedido</h2>
      <div>
        <div
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          { `Pedido 00${orders[0].id}` }
        </div>
        <div
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          { orders.saleDate }
        </div>
        <div
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          { orders.status }
        </div>
        <div
          data-testid="seller_order_details__button-preparing-check"
        >
          preparar pedido
        </div>
        <div
          data-testid="seller_order_details__button-dispatch-check"
        >
          saiu para entrega
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          { orders.map((order, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `seller_order_details__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }
              </td>
              <td
                data-testid={ `seller_order_details__element-order-table-name-${index}` }
              >
                { order.name }
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-quantity-${index}`
                }
              >
                { order.quantity }
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-unit-price-${index}`
                }
              >
                { `R$ ${order.price}` }
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-sub-total-${index}`
                }
              >
                { `R$ ${(order.quantity) * order.price}` }
              </td>
            </tr>
          )) }
        </tbody>
      </table>
      <div
        data-testid="seller_order_details__element-order-total-price"
      >
        { orders[0].totalPrice }
      </div>
    </main>
  );
}

export default OrderDetails;
