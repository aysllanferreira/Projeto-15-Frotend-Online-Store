import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import Rating from '../components/Rating';

class PageItem extends Component {
  state = {
    products: {},
    email: '',
    evaluation: '',
    result: [],
    permission: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({ products: product }, () => {
      this.getFromLocalStorage();
    });
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.id]: target.value,
    });
  };

  getFromLocalStorage = () => {
    const { products } = this.state;
    const result = JSON.parse(localStorage.getItem(products.id));
    console.log(result);
    if (result) {
      this.setState({ result });
    }
  };

  saveLocalStorage = (result) => {
    const { products } = this.state;
    localStorage.setItem(products.id, JSON.stringify(result));
  };

  handleClick = () => {
    const { email, evaluation, result } = this.state;
    const ratings = document.querySelectorAll('input[name="rate"]');

    const verifyRatings = [...ratings].some((rating) => rating.checked);
    if (!verifyRatings) return this.setState({ permission: true });

    const obj = {
      email,
      evaluation,
      rating: [...ratings].find((rating) => rating.checked).value,
    };

    this.setState({
      email: '',
      evaluation: '',
      result: [...result, obj],
      permission: false,
    });
    this.saveLocalStorage([...result, obj]);
  };

  render() {
    const { products, permission, email, evaluation, result } = this.state;
    const { title, price, thumbnail, id } = products;
    const { addCartItem } = this.props;

    return (
      <div className={ id }>
        <h2 data-testid="product-detail-name">{title}</h2>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ id }
        />
        <h2 data-testid="product-detail-price">{price}</h2>

        <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ addCartItem }
        >
          Adicionar ao carrinho

        </button>
        <Rating
          saveLocal={ this.saveLocalStorage }
          handleChanges={ this.handleChange }
          permission={ permission }
          email={ email }
          handleClick={ this.handleClick }
          evaluation={ evaluation }
          result={ result }
        />
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
  addCartItem: PropTypes.func.isRequired,
};

export default PageItem;
