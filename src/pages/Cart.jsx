import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartItems from '../components/CartItems';

class Cart extends Component {
  render() {
    const {
      cartSaved, deleteLocalStorageItem, handleDecrease, handleSum, sum,
    } = this.props;
    return (
      <div>
        {cartSaved.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : <CartItems
          cartSaved={ cartSaved }
          deleteLocalStorageItem={ deleteLocalStorageItem }
          handleDecrease={ handleDecrease }
          handleSum={ handleSum }
          sum={ sum }
        />}

      </div>
    );
  }
}

Cart.propTypes = {
  cartSaved: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  deleteLocalStorageItem: PropTypes.func.isRequired,
  handleDecrease: PropTypes.func.isRequired,
  handleSum: PropTypes.func.isRequired,
  sum: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default Cart;
