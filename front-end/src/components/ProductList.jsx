import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ProductCard from './ProductCard';
import contextProduct from '../context/ProductContext';

const listProducts = (products) => products.map((product, key) => (
  <ProductCard key={ key } productInfo={ product } />
));

function ProductList() {
  const { valuesProducts, setValuesProducts, total, cart } = useContext(contextProduct);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
    // const token = JSON.parse(localStorage.getItem('token'));
      const result = await fetch('http://localhost:3001/products');
      const resultJson = await result.json();
      setValuesProducts(resultJson);
    }
    fetchData();
  }, []);

  const handleClick = () => {
    localStorage.setItem('carrinho', JSON.stringify(cart));
    history.push('/customer/checkout');
  };

  return (
    <>
      { valuesProducts
        ? <form>{ listProducts(valuesProducts) }</form> : <h1>Loading...</h1> }
      <button
        type="button"
        onClick={ handleClick }
      >
        {`Ver Carrinho: ${total}`}
      </button>
    </>
  );
}

export default ProductList;
