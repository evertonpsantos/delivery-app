import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ProductContext from './ProductContext';

const initialStateProducts = () => ([]);

function ProviderProduct({ children }) {
  const [valuesProducts, setValuesProducts] = useState(initialStateProducts);
  const [products, setProducts] = useState();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('carrinho')) || []);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalPrice = cart
      .reduce((acc, curr) => (Number(curr.price) * Number(curr.quantity)) + acc, 0);
    setTotal(Number(totalPrice).toFixed(2));
  }, [cart]);

  const contextValue = useMemo(() => ({
    products,
    setProducts,
    setValuesProducts,
    valuesProducts,
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
