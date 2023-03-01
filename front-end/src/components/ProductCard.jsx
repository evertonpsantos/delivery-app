import React, { useContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/cardCustomesProducts.css';
import ContextProduct from '../context/ProductContext';

function ProductCard({ productInfo }) {
  const { name, id, price, urlImage } = productInfo;
  const [quantity, setQuantity] = useState(0);
  const { cart, setCart } = useContext(ContextProduct);

  const updateCart = () => {
    const newCart = [...cart];
    const isInTheCart = cart.find((item) => item.name === name);
    if (!isInTheCart) return setCart([...cart, { name, price, id, quantity }]);
    const itemCartIndex = newCart.indexOf(isInTheCart);
    newCart[itemCartIndex].quantity = quantity;
    setCart(newCart);
  };

  const onChangeHandler = (event) => {
    setQuantity(event.target.value);
    updateCart();
  };

  const onClickHandler = (event) => {
    if (event.target.name === 'add-item') {
      setQuantity(quantity + 1);
      updateCart();
    } else if (quantity > 0) {
      setQuantity(quantity - 1);
      updateCart();
    }
  };

  return (
    <div className="container_cards" data-testid={ id }>
      <div className="product_card">
        <div
          className="card_price"
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { price }
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
            onClick={ onClickHandler }
          >
            +
          </button>
          <input
            type="number"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            placeholder="0"
            id="quantity"
            min="0"
            value={ quantity }
            onChange={ onChangeHandler }
          />

          <button
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            className={ `incremento-${id}` }
            type="button"
            name="rm-item"
            onClick={ onClickHandler }
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
