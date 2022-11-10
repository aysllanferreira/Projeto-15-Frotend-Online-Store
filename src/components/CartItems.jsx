import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartItems extends Component {
  render() {
    const {
      cartSaved, deleteLocalStorageItem, handleDecrease, handleSum, sum,
    } = this.props;

    console.log(sum);

    return (
      <div>
        <div>
          {cartSaved.map(({ id, title, thumbnail }, index) => (
            <div key={ Math.random() } id={ index }>
              <img alt={ id } src={ thumbnail } />
              <p data-testid="shopping-cart-product-name">{ title }</p>

              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ handleSum }
              >
                +

              </button>
              <p
                data-testid="shopping-cart-product-quantity"
              >
                { sum.length > 0 && `${sum[index][id].quantity}` }

              </p>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ handleDecrease }
              >
                -

              </button>
              <button
                type="button"
                data-testid="remove-product"
                onClick={ deleteLocalStorageItem }
              >
                Deletar

              </button>

            </div>
          ))}
        </div>

      </div>
    );
  }
}

CartItems.propTypes = {
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

export default CartItems;
