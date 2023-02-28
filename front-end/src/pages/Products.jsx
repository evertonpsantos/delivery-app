import React, { useContext } from 'react';
import context from '../contexts/myContext';
import NavBar from '../components/NavBar';
import ProductList from '../components/ProductList';

function Products() {
  const { products } = useContext(context);
  console.log(products);
  return (
    <>
      <NavBar />
      <ProductList />
    </>
  );
}

export default Products;
