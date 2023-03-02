import React, { useEffect, useState } from 'react';
import fetchData from '../helpers/fetchData';
import '../styles/myOrdersPage.css';

export default function OrdersClient() {
  const [myOrders, setMyOrders] = useState([]);

  const NUMBER10 = 10;
  const NUMBER4 = 4;
  const NUMBER5 = 5;
  const NUMBER7 = 7;
  const NUMBER8 = 8;

  function fixSaleDate(arr) {
    const mappedArray = arr.map((e) => {
      const date = e.saleDate.toString();
      const sliceDate = date.slice(0, NUMBER10);
      const year = sliceDate.slice(0, NUMBER4);
      const month = sliceDate.slice(NUMBER5, NUMBER7);
      const day = sliceDate.slice(NUMBER8, NUMBER10);

      const stringDate = `${day}/${month}/${year}`;
      return { ...e, saleDate: stringDate };
    });
    return mappedArray;
  }

  useEffect(() => {
    const getData = async () => {
      const orders = await fetchData('http://localhost:3001/sales');
      setMyOrders(fixSaleDate(orders));
    };

    getData();
  }, []);

  if (myOrders.length < 1) return <div>Loading...</div>;

  const orders = myOrders.map((order) => (
    <section className="order-content" key={ order.id }>
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
        { `$ ${}`order.totalPrice }
      </div>
    </section>
  ));

  return (
    <main className="container-myorders">
      { orders }
    </main>
  );
}
