import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartItems extends Component {
  render() {
    const { cartSaved } = this.props;

    return (
      <div>
        {cartSaved.map(({ id, title, thumbnail }) => (
          <div key={ Math.random() }>
            <img alt={ id } src={ thumbnail } />
            <p data-testid="shopping-cart-product-name">{ title }</p>
            <p
              data-testid="shopping-cart-product-quantity"
            >
              { cartSaved.filter((p) => p.id === id).length }

            </p>
          </div>
        ))}
      </div>
    );
  }
}

CartItems.propTypes = {
  cartSaved: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default CartItems;
