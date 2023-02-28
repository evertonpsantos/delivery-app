import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

function ProductCard({ productInfo }) {
  const { name, id, price, urlImage } = productInfo;
  const [quantity, setQuantity] = useState(0);

  const onChangeHandler = (event) => {
    setQuantity(event.target.value);
    console.log(quantity);
  };

  const onClickHandler = (event) => {
    if (event.target.name === 'add-item') {
      setQuantity(quantity + 1);
    } else if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div data-testid={ id }>
      <h1>{ name }</h1>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <h3 data-testid={ `customer_products__element-card-price-${id}` }>
        { `R$ ${price}` }
      </h3>
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
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
        type="button"
        name="rm-item"
        onClick={ onClickHandler }
      >
        -
      </button>
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
