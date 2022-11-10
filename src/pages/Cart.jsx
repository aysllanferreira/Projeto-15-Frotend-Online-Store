import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartItems from '../components/CartItems';

class Cart extends Component {
  render() {
    const { cartSaved } = this.props;
    return (
      <div>
        {cartSaved.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : <CartItems cartSaved={ cartSaved } />}
      </div>
    );
  }
}

Cart.propTypes = {
  cartSaved: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default Cart;
