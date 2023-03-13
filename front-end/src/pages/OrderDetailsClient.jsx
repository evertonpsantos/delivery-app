import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../helpers/fetchData';
import translateDatetimeToDate from '../helpers/translateDatetimeToDate';
import '../styles/clientOrderDetails.css';
import NavBar from '../components/NavBar';

function OrderDetails() {
  const [orders, setOrders] = useState([]);

  const { id } = useParams();

  const bug = 'customer_order_details__element-order-details-label-order-date';

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

  const updateSaleStatus = async (saleId, status) => {
    await fetch(`http://localhost:3001/sales/${saleId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      'Access-Control-Allow-Origin': '*',
    });

    const myOrders = await fetchData(`http://localhost:3001/salesproducts/${id}`);
    const orderDetailed = translateDatetimeToDate(myOrders);
    setOrders(orderDetailed);
  };

  return (
    <main className="client-details-order-page-main-order-details">
      <NavBar />
      <h2>Detalhes do pedido</h2>
      <div className="client-details-order-page-header-infos">
        <div
          className="client-details-order-page-order-number"
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          { `Pedido 00${orders[0].id}` }
        </div>
        <div
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          { orders[0].seller }
        </div>
        <div
          className="client-details-order-page-order-number"
          data-testid={ bug }
        >
          { orders[0].saleDate }
        </div>
        <div
          className={
            `client-details-order-page-order-status-${orders[0].status.replace('â', 'a')
              .replace('Em T', 'em-t')}`
          }
          data-testid={
            `customer_order_details__element-order-details-label-delivery-status-${id}`
          }
        >
          { orders[0].status }
        </div>
        <button
          className="client-details-order-page-mark-as-delivered"
          type="button"
          disabled={ orders[0].status !== 'Em Trânsito' }
          onClick={ () => updateSaleStatus(orders[0].id, 'Entregue') }
          data-testid="customer_order_details__button-delivery-check"
        >
          marcar como entregue
        </button>
      </div>
      <div>
        <div className="client-details-order-page-table-head">
          <div>Item</div>
          <div>Descrição</div>
          <div>Quantidade</div>
          <div>Valor Unitário</div>
          <div>Sub-total</div>
        </div>
        <div className="client-details-order-page-table-att">
          { orders.map((order, index) => {
            const productPrice = Number(order.price).toFixed(2);
            const productQuantity = Number(order.quantity);
            const subTotal = parseFloat(productPrice * productQuantity).toFixed(2);

            const showedUnitValue = productPrice.toString().replace('.', ',');
            const showedSubTotal = subTotal.toString().replace('.', ',');
            return (
              <div
                className="client-details-order-page-table-body"
                key={ index }
              >
                <div
                  className="client-details-order-page-number-product"
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </div>
                <div
                  className="client-details-order-page-description-product"
                  data-testid={
                    `customer_order_details__element-order-table-name-${index}`
                  }
                >
                  { order.name }
                </div>
                <div
                  className="client-details-order-page-quantity-product"
                  data-testid={
                    `customer_order_details__element-order-table-quantity-${index}`
                  }
                >
                  { order.quantity }
                </div>
                <div
                  className="client-details-order-page-unit-value-product"
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  { `R$ ${showedUnitValue}` }
                </div>
                <div
                  className="client-details-order-page-sub-total-product"
                  data-testid={
                    `customer_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  { `R$ ${showedSubTotal}` }
                </div>
              </div>
            );
          }) }
        </div>
      </div>
      <div
        className="client-details-order-page-total-price-product"
        data-testid="customer_order_details__element-order-total-price"
      >
        { orders[0].totalPrice }
      </div>
    </main>
  );
}

export default OrderDetails;
