import React, { useContext } from 'react';
import ProductCard from './ProductCard';
import context from '../contexts/myContext';

const listProducts = (products) => products.map((product, key) => (
  <ProductCard key={ key } productInfo={ product } />
));

function ProductList() {
  const { products } = useContext(context);
  return (
    <>
      { products
        ? <form>{ listProducts(products) }</form> : <h1>Loading...</h1> }
      <button type="button">
        Ver Carrinho:
        {/* {`Ver Carrinho: ${total.toFixed(2)}`} */}
      </button>
    </>
  );
}

export default ProductList;
