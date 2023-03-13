import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavbarSeller from '../components/NavbarSeller';
import fetchData from '../helpers/fetchData';
import translateDatetimeToDate from '../helpers/translateDatetimeToDate';
import '../styles/sellerOrdersPage.css';

function OrdersSellers() {
  const [orders, setOrders] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const result = await fetchData(`http://localhost:3001/sales/seller/${user.id}`);
      setOrders(translateDatetimeToDate(result));
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pushTo(id) {
    history.push(`/seller/orders/${id}`);
  }

  if (orders.length < 1) return <div>Loading...</div>;

  const myOrders = orders.map((order) => {
    const priceTotal = Number(order.totalPrice).toFixed(2).toString().replace('.', ',');
    return (
      <section
        role="presentation"
        onClick={ () => pushTo(order.id) }
        className="seller-order-page-order-content"
        key={ order.id }
      >
        <div
          data-testid={ `seller_orders__element-order-id-${order.id}` }
          className="seller-order-page-number-order"
        >
          <div>
            <p className="pedido">Pedido</p>
            { `000${order.id}` }
          </div>
        </div>

        <div
          data-testid={ `seller_orders__element-delivery-status-${order.id}` }
          className={
            `seller-order-page-status-${order.status.replace('â', 'a')
              .replace('Em T', 'em-t')}`
          }
        >
          { order.status }
        </div>

        <div
          data-testid={ `seller_orders__element-order-date-${order.id}` }
          className="seller-order-page-date-order"
        >
          { order.saleDate }
        </div>

        <div
          data-testid={ `seller_orders__element-card-price-${order.id}` }
          className="seller-order-page-total-price-order"
        >
          {priceTotal}
        </div>
        <div
          data-testid={ `seller_orders__element-card-address-${order.id}` }
          className="seller-order-page-address-order"
        >
          { `${order.deliveryAddress}, ${order.deliveryNumber} ` }
        </div>
      </section>
    );
  });

  return (
    <main className="seller-order-page-container-myorders">
      <NavbarSeller />
      { myOrders }
    </main>
  );
}

export default OrdersSellers;
