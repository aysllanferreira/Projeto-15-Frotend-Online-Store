import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class PageItem extends Component {
  state = {
    products: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    console.log(product);
    this.setState({ products: product });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <h2 data-testid="product-detail-name">{products.title}</h2>
        <img
          data-testid="product-detail-image"
          src={ products.thumbnail }
          alt={ products.id }
        />
        <h2 data-testid="product-detail-price">{products.price}</h2>

        <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
      </div>
    );
  }
}

PageItem.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PageItem;
