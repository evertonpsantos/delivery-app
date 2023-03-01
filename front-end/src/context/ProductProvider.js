import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ProductContext from './ProductContext';

const initialStateProducts = () => ([]);

function ProviderProduct({ children }) {
  const [valuesProducts, setValuesProducts] = useState(initialStateProducts);
  const [products, setProducts] = useState();
  const [productsToCart, setProductsToCart] = useState(
    JSON.parse(localStorage.getItem('carrinho')),
  );
  const [totalProducts, setTotalProducts] = useState(JSON.parse(
    localStorage.getItem('total') || 0,
  ));

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0.00);

  useEffect(() => {
    const totalPrice = cart
      .reduce((acc, curr) => (Number(curr.price) * Number(curr.quantity)) + acc, 0);
    setTotal(totalPrice.toFixed(2));
  }, [cart]);

  const contextValue = useMemo(() => ({
    products,
    setProducts,
    setValuesProducts,
    valuesProducts,
    productsToCart,
    setProductsToCart,
    totalProducts,
    setTotalProducts,
    cart,
    setCart,
    total,
    setTotal,
  }));

  return (
    <ProductContext.Provider value={ contextValue }>
      { children }
    </ProductContext.Provider>
  );
}

ProviderProduct.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderProduct;
