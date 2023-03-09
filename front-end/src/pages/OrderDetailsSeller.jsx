import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../helpers/fetchData';
import translateDatetimeToDate from '../helpers/translateDatetimeToDate';
import '../styles/sellerOrderDetails.css';
import NavbarSeller from '../components/NavbarSeller';

function OrderDetailsSeller() {
  const [orders, setOrders] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const myOrders = await fetchData(`http://localhost:3001/salesproducts/${id}`);
      const orderDetailed = translateDatetimeToDate(myOrders);
      setOrders(orderDetailed);
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
    <main className="seller-details-order-page-main-order-details">
      <NavbarSeller />
      <h2>Detalhes do pedido</h2>
      <div className="seller-details-order-page-header-infos">
        <div
          className="seller-details-order-page-order-number"
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          { `Pedido 00${orders[0].id}` }
        </div>
        <div
          className="seller-details-order-page-order-number"
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          { orders[0].saleDate }
        </div>
        <div
          className={
            `seller-details-order-page-order-status-${orders[0].status.replace('â', 'a')
              .replace('Em T', 'em-t')}`
          }
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          { orders[0].status }
        </div>
        <button
          className="seller-details-order-page-mark-as-delivered"
          type="button"
          disabled={ orders[0].status !== 'Pendente' }
          data-testid="seller_order_details__button-preparing-check"
          onClick={ () => updateSaleStatus(orders[0].id, 'Preparando') }
        >
          preparar pedido
        </button>
        <button
          className="seller-details-order-page-mark-as-in-delivery"
          type="button"
          disabled={ orders[0].status !== 'Preparando' }
          onClick={ () => updateSaleStatus(orders[0].id, 'Em Trânsito') }
          data-testid="seller_order_details__button-dispatch-check"
        >
          saiu para entrega
        </button>
      </div>
      <div>
        <div className="seller-details-order-page-table-head">
          <div>Item</div>
          <div>Descrição</div>
          <div>Quantidade</div>
          <div>Valor Unitário</div>
          <div>Sub-total</div>
        </div>
        <div className="seller-details-order-page-table-att">
          { orders.map((order, index) => {
            const productPrice = Number(order.price).toFixed(2);
            const productQuantity = Number(order.quantity);
            const subTotal = parseFloat(productPrice * productQuantity).toFixed(2);

            const showedUnitValue = productPrice.toString().replace('.', ',');
            const showedSubTotal = subTotal.toString().replace('.', ',');
            return (
              <div key={ index } className="seller-details-order-page-table-body">
                <div
                  className="seller-details-order-page-number-product"
                  data-testid={
                    `seller_order_details__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </div>
                <div
                  className="seller-details-order-page-description-product"
                  data-testid={
                    `seller_order_details__element-order-table-name-${index}`
                  }
                >
                  { order.name }
                </div>
                <div
                  className="seller-details-order-page-quantity-product"
                  data-testid={
                    `seller_order_details__element-order-table-quantity-${index}`
                  }
                >
                  { order.quantity }
                </div>
                <div
                  className="seller-details-order-page-unit-value-product"
                  data-testid={
                    `seller_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  { `R$ ${showedUnitValue}` }
                </div>
                <div
                  className="seller-details-order-page-sub-total-product"
                  data-testid={
                    `seller_order_details__element-order-table-sub-total-${index}`
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
        data-testid="seller_order_details__element-order-total-price"
      >
        { orders[0].totalPrice }
      </div>
    </main>
  );
}

export default OrderDetailsSeller;
