import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ProductCard from './ProductCard';
import contextProduct from '../context/ProductContext';

const listProducts = (products) => products.map((product, key) => (
  <ProductCard key={ key } productInfo={ product } />
));

function ProductList() {
  const history = useHistory();
  const { valuesProducts, setValuesProducts, cart } = useContext(contextProduct);
  const { totalValue } = cart;
  const valorDoFront = totalValue.toFixed(2).toString().replace('.', ',');

  useEffect(() => {
    async function fetchData() {
    // const token = JSON.parse(localStorage.getItem('token'));
      const result = await fetch('http://localhost:3001/products');
      const resultJson = await result.json();
      setValuesProducts(resultJson);
    }
    fetchData();
  }, []);

  const handleCheckout = () => {
    localStorage.setItem('carrinho', JSON.stringify(cart));
    history.push('/customer/checkout');
  };

  return (
    <>
      { valuesProducts
        ? <form>{ listProducts(valuesProducts) }</form> : <h1>Loading...</h1> }
      <p>Ver Carrinho</p>
      <button
        type="button"
        data-testid="customer_products__checkout-bottom-value"
        onClick={ handleCheckout }
      >
        { valorDoFront }
      </button>
    </>
  );
}

export default ProductList;
