import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Home extends Component {
  render() {
    const { categoriesProducts, searchInput, productsSearch,
      fetchProdutcsSearch, handleChange, addCartItem, salvador } = this.props;
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
        {salvador.length === 0 ? (<span data-testid="shopping-cart-size">{0}</span>)
          : (<span data-testid="shopping-cart-size">{salvador.length}</span>)}
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        {productsSearch && categoriesProducts.length === 0 ? (
          <p>
            Nenhum produto foi encontrado
          </p>)
          : categoriesProducts.map(({ id, title, thumbnail, price, shipping }) => (
            <div key={ id } data-testid="product" id={ id }>
              <h2>{title}</h2>
              <img src={ thumbnail } alt={ id } />
              <h2>{price}</h2>
              <Link
                data-testid="product-detail-link"
                to={ `/page-item/${id}` }
              >
                Detalhes

              </Link>
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ addCartItem }
              >
                Adicionar ao Carrinho

              </button>
              {shipping.free_shipping
                ? (<p data-testid="free-shipping">Frete Grátis</p>) : null}
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
  addCartItem: PropTypes.func.isRequired,
  salvador: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Home;
