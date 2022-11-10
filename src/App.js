import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import {
  getProductsFromCategoryAndQuery, getCategories, getProductByCategory,
} from './services/api';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Category from './components/Category';
import PageItem from './pages/PageItem';

class App extends React.Component {
  state = {
    categories: [],
    categoriesProducts: [],
    searchInput: '',
    categoryID: '',
    productsSearch: false,
    cartSaved: [],
  };

  componentDidMount() {
    this.fetchCategories();
    if (localStorage.getItem('cart')) {
      this.setState({ cartSaved: JSON.parse(localStorage.getItem('cart')) });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  fetchProdutcsSearch = async () => {
    const { searchInput, categoryID } = this.state;
    const response = await getProductsFromCategoryAndQuery(categoryID, searchInput);
    this.setState({
      categoriesProducts: response.results,
      productsSearch: true,
    });
  };

  fetchCategories = async () => {
    const fetch = await getCategories();
    this.setState({
      categories: fetch,
    });
    return fetch;
  };

  fetchCategorySearch = async (categoryID) => {
    const response = await getProductByCategory(categoryID);
    this.setState({
      categoriesProducts: response.results,
      productsSearch: true,
    });
  };

  handleClick = async ({ target }) => {
    const { id } = target;
    await this.fetchCategorySearch(id);
  };

  saveLocalStorage = async () => {
    const { cartSaved } = this.state;
    localStorage.setItem('cart', JSON.stringify(cartSaved));
  };

  addCartItem = async (param) => {
    if (param.target.parentNode.id) {
      const newItem = param.target.parentNode.id;
      const { categoriesProducts } = this.state;
      const item = categoriesProducts.find((product) => product.id === newItem);
      this.setState((state) => ({
        cartSaved: [...state.cartSaved, item],
      }), async () => this.saveLocalStorage());
    } else {
      const newItem = param.target.parentNode.className;
      const { categoriesProducts } = this.state;
      const item = categoriesProducts.find((product) => product.id === newItem);
      this.setState((state) => ({
        cartSaved: [...state.cartSaved, item],
      }), async () => this.saveLocalStorage());
    }
  };

  render() {
    const {
      categories, categoriesProducts, searchInput, productsSearch, cartSaved,
    } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Home
              categoriesProducts={ categoriesProducts }
              searchInput={ searchInput }
              productsSearch={ productsSearch }
              fetchProdutcsSearch={ this.fetchProdutcsSearch }
              handleChange={ this.handleChange }
              addCartItem={ this.addCartItem }
            />
            ) }
          />
          <Route
            exact
            path="/page-item/:id"
            render={ (props) => (
              <PageItem
                { ...props }
                addCartItem={ this.addCartItem }
              />
            ) }
          />
          <Route
            exact
            path="/cart"
            render={ () => (
              <Cart cartSaved={ cartSaved } />
            ) }
          />
        </Switch>
        <Category
          handleChange={ this.handleClick }
          categories={ categories }
        />
      </div>
    );
  }
}

export default App;
