import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchData from '../helpers/fetchData';
import '../styles/myOrdersPage.css';
import translateDatetimeToDate from '../helpers/translateDatetimeToDate';

export default function OrdersClient() {
  const [myOrders, setMyOrders] = useState([]);

  const history = useHistory();
  const MOCKUSERID = 3;

  useEffect(() => {
    const getData = async () => {
      const orders = await fetchData(`http://localhost:3001/sales/user/${MOCKUSERID}`);
      setMyOrders(translateDatetimeToDate(orders));
    };

    getData();
  }, []);

  function pushTo(id) {
    history.push(`/customer/orders/${id}`);
  }

  if (myOrders.length < 1) return <div>Loading...</div>;

  const orders = myOrders.map((order) => (
    <section
      role="presentation"
      onClick={ () => pushTo(order.id) }
      className="order-content"
      key={ order.id }
    >
      <div
        data-testid={ `customer_orders__element-order-id-${order.id}` }
        className="number-order"
      >
        <div>
          <p className="pedido">Pedido</p>
          { `000${order.id}` }
        </div>
      </div>

      <div
        data-testid={ `customer_orders__element-delivery-status-${order.id}` }
        className={ `status-${order.status}` }
      >
        { order.status }
      </div>

      <div
        data-testid={ `customer_orders__element-order-date-${order.id}` }
        className="date-order"
      >
        { order.saleDate }
      </div>

      <div
        data-testid={ `customer_orders__element-card-price-${order.id}` }
        className="total-price-order"
      >
        { `R$ ${order.totalPrice}` }
      </div>
    </section>
  ));

  return (
    <main className="container-myorders">
      { orders }
    </main>
  );
}
