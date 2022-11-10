import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Home extends Component {
  render() {
    const { categoriesProducts, searchInput, productsSearch,
      fetchProdutcsSearch, handleChange } = this.props;
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
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="query-button"
          onClick={ fetchProdutcsSearch }
        >
          Pesquisar

        </button>
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        {productsSearch && categoriesProducts.length === 0 ? (
          <p>
            Nenhum produto foi encontrado
          </p>)
          : categoriesProducts.map((item) => (
            <div key={ item.id } data-testid="product">
              <h2>{item.title}</h2>
              <img src={ item.thumbnail } alt={ item.id } />
              <h2>{item.price}</h2>
              <Link
                data-testid="product-detail-link"
                to={ `/page-item/${item.id}` }
              >
                Detalhes

              </Link>
            </div>
          ))}
      </div>
    );
  }
}

Home.propTypes = {
  categoriesProducts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  searchInput: PropTypes.string.isRequired,
  productsSearch: PropTypes.bool.isRequired,
  fetchProdutcsSearch: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Home;
