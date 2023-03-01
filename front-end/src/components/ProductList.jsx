import React, { useContext, useEffect } from 'react';
import ProductCard from './ProductCard';
import contextProduct from '../context/ProductContext';

const listProducts = (products) => products.map((product, key) => (
  <ProductCard key={ key } productInfo={ product } />
));

function ProductList() {
  const { valuesProducts, setValuesProducts } = useContext(contextProduct);
  console.log(valuesProducts);

  useEffect(() => {
    async function fetchData() {
    // const token = JSON.parse(localStorage.getItem('token'));
      const result = await fetch('http://localhost:3001/products');
      const resultJson = await result.json();
      setValuesProducts(resultJson);
    }
    fetchData();
  }, []);

  return (
    <>
      { valuesProducts
        ? <form>{ listProducts(valuesProducts) }</form> : <h1>Loading...</h1> }
      <button type="button">
        Ver Carrinho:
        {/* {`Ver Carrinho: ${total.toFixed(2)}`} */}
      </button>
    </>
  );
}

export default ProductList;
