import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchData from '../helpers/fetchData';
import '../styles/clientOrdersPage.css';
import translateDatetimeToDate from '../helpers/translateDatetimeToDate';
import NavBar from '../components/NavBar';

export default function OrdersClient() {
  const [myOrders, setMyOrders] = useState([]);

  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const getData = async () => {
      const orders = await fetchData(`http://localhost:3001/sales/user/${user.id}`);
      setMyOrders(translateDatetimeToDate(orders));
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pushTo(id) {
    history.push(`/customer/orders/${id}`);
  }

  if (myOrders.length < 1) return <div>Loading...</div>;

  const orders = myOrders.map((order) => {
    const priceTotal = Number(order.totalPrice).toFixed(2).toString().replace('.', ',');
    return (
      <section
        role="presentation"
        onClick={ () => pushTo(order.id) }
        className="client-order-page-order-content"
        key={ order.id }
      >
        <div
          data-testid={ `customer_orders__element-order-id-${order.id}` }
          className="client-order-page-number-order"
        >
          <div>
            <p className="client-order-page-pedido">Pedido</p>
            { `000${order.id}` }
          </div>
        </div>

        <div
          data-testid={ `customer_orders__element-delivery-status-${order.id}` }
          className={ `client-order-page-status-${order.status.replace('â', 'a')
            .replace('Em T', 'em-t')}` }
        >
          { order.status }
        </div>

        <div
          data-testid={ `customer_orders__element-order-date-${order.id}` }
          className="client-order-page-date-order"
        >
          { order.saleDate }
        </div>

        <div
          data-testid={ `customer_orders__element-card-price-${order.id}` }
          className="client-order-page-total-price-order"
        >
          {priceTotal}
        </div>
      </section>
    );
  });

  return (
    <main className="client-order-page-container-myorders">
      <NavBar />
      { orders }
    </main>
  );
}
