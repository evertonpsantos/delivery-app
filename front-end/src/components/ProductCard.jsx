import React, { useContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/cardCustomesProducts.css';
import contextProduct from '../context/ProductContext';

function ProductCard({ productInfo }) {
  const { cart, setCart, totalGeral, setTotalGeral } = useContext(contextProduct);
  const { totalValue, products } = cart;
  console.log('🚀 ~ file: ProductCard.jsx:9 ~ ProductCard ~ totalValue:', totalValue);
  const [quantity, setQuantity] = useState(0);
  const { name, id, price, urlImage } = productInfo;
  const displayedPrice = parseFloat(price);
  const priceFront = parseFloat(price).toFixed(2).replace('.', ',');

  // const onChangeHandler = (event) => {
  //   setQuantity(event.target.value);
  // };

  // const onClickHandler = (event) => {
  //   if (event.target.name === 'add-item') {
  //     setQuantity(quantity + 1);
  //   } else if (quantity > 0) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  const updateCart = ({ target }) => {
    if (target.name === 'add-item') {
      const exists = products.findIndex((item) => item.id === id);
      const notExist = -1;

      setQuantity(quantity + 1);

      const newCart = { totalValue: totalValue + displayedPrice, products };

      if (exists === notExist) {
        newCart.products = [...products, { urlImage,
          name,
          displayedPrice,
          id,
          quantity: 1 }];
      }

      if (exists > notExist) newCart.products[exists].quantity += 1;

      setCart(newCart);
    }

    if (target.name === 'rm-item') {
      if (quantity === 0) return;
      const indexItem = products.findIndex((item) => item.id === id);
      const itemToUpdate = products[indexItem];

      const newCart = { totalValue: totalValue - displayedPrice, products };

      if (quantity === 1) newCart.products.splice(itemToUpdate, 1);
      if (quantity > 1) newCart.products[indexItem].quantity -= 1;

      setQuantity(quantity - 1);
      setCart(newCart);
    }
  };

  console.log('🚀 ~ file: ProductCard.jsx:8 ~ ProductCard ~ cart:', cart);

  const changeQttByInput = ({ target }) => {
    setQuantity(Number(target.value));
    // const notExist = -1;
    const exists = products.findIndex((item) => item.id === id);
    const notExist = -1;

    if (target.value > 0) {
      const newCart = {
        totalValue: (Number(target.value) * displayedPrice) + totalValue, products };
      if (exists === notExist) {
        newCart.products = [...products, { urlImage,
          name,
          displayedPrice,
          id,
          quantity: Number(target.value) }];
      }

      setCart(newCart);
    }

    // setQuantity(Number(currentTarget));

    // const newCart = { totalValue: totalValue + displayedPrice, products };

    // if (exists === notExist) {
    //   newCart.products = [...products, { urlImage, name, displayedPrice, id, quantity: Number(currentTarget) }];
    // }

    // if (exists > notExist) newCart.products[exists].quantity += currentTarget;

    // setCart(newCart);
  };

  // useEffect(() => {
  //   changeQttByInput();
  // }, [quantity]);

  return (
    <div className="container_cards" data-testid={ id }>
      <div className="product_card">
        <div
          className="card_price"
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { priceFront }
        </div>

        <img
          src={ urlImage }
          alt={ `Imagem de ${name}` }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          className="image"
        />
        <div className="product_card__footer">
          <p
            className="product_name"
            data-testid={ `customer_products__element-card-title-${id}` }
          >
            { name }
          </p>
        </div>
        <div className="quantity">
          <button
            data-testid={ `customer_products__button-card-add-item-${id}` }
            className={ `decremento-${id}` }
            type="button"
            name="add-item"
            onClick={ updateCart }
          >
            +
          </button>
          <input
            type="number"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            value={ quantity }
            onChange={ (event) => changeQttByInput(event) }
          />

          <button
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            className={ `incremento-${id}` }
            type="button"
            name="rm-item"
            onClick={ updateCart }
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  productInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
