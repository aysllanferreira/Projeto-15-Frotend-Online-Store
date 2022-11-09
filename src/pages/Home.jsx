import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categoriesProducts: [],
      searchInput: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  fetchProdutcsSearch = async () => {
    const { searchInput } = this.state;
    const response = await getProductsFromCategoryAndQuery(searchInput, searchInput);
    this.setState({
      categoriesProducts: response.results,
    });
  };

  render() {
    const { categoriesProducts, searchInput } = this.state;
    // console.log(categoriesProducts);
    return (
      <div>
        <label htmlFor="search">
          Pesquisa:
          <input
            type="text"
            id="search"
            data-testid="query-input"
            value={ searchInput }
            name="searchInput"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.fetchProdutcsSearch }
        >
          Pesquisar

        </button>
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        {categoriesProducts.map((item) => (
          <div key={ item.id }>
            <h2>{item.title}</h2>
            <img src={ item.thumbnail } alt={ item.id } />
            <h2>{item.price}</h2>
          </div>
        ))}
      </div>
    );
  }
}

export default Home;
