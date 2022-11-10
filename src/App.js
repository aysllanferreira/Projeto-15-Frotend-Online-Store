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
    sum: [],
  };

  componentDidMount() {
    this.fetchCategories();
    if (localStorage.getItem('cart')) {
      this.setState({ cartSaved: JSON.parse(localStorage.getItem('cart')) });
    }
    this.getSumLocalStorage();
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

  addCartItem = async ({ target }) => {
    if (target.parentNode.id) {
      const newItem = target.parentNode.id;
      const { categoriesProducts } = this.state;
      const item = categoriesProducts.find((product) => product.id === newItem);
      this.setState((state) => ({
        cartSaved: [...state.cartSaved, item],
        sum: [...state.sum, { [item.id]: {
          quantity: 1,
        } }],
      }), async () => this.saveLocalStorage());
    } else {
      const newItem = target.parentNode.className;
      const { categoriesProducts } = this.state;
      const item = categoriesProducts.find((product) => product.id === newItem);
      this.setState((state) => ({
        cartSaved: [...state.cartSaved, item],
        sum: [...state.sum, { [newItem]: {
          quantity: 1,
        } }],
      }), async () => this.saveLocalStorage());
    }
  };

  deleteLocalStorageItem = ({ target }) => {
    const theId = target.parentNode.firstChild.alt;
    const { cartSaved } = this.state;
    const newCart = cartSaved.filter(({ id }) => id !== theId);
    localStorage.setItem('cart', JSON.stringify(newCart));
    this.setState({ cartSaved: newCart });
  };

  getSumLocalStorage = () => {
    if (localStorage.getItem('sum')) {
      this.setState({ sum: JSON.parse(localStorage.getItem('sum')) });
    }
  };

  saveSumLocalStorage = () => {
    const { sum } = this.state;
    localStorage.setItem('sum', JSON.stringify(sum));
  };

  handleSum = ({ target }) => {
    const { cartSaved, sum } = this.state;
    const theId = target.parentNode.firstChild.alt;
    const item = cartSaved.find((product) => product.id === theId);
    const index = cartSaved.indexOf(item);
    const newSum = sum;
    newSum[index][theId].quantity += 1;
    this.setState({ sum: newSum }, () => this.saveSumLocalStorage());
  };

  handleDecrease = ({ target }) => {
    const { cartSaved, sum } = this.state;
    const theId = target.parentNode.firstChild.alt;
    const item = cartSaved.find((product) => product.id === theId);
    const index = cartSaved.indexOf(item);
    const newSum = sum;
    newSum[index][theId].quantity -= 1;
    if (newSum[index][theId].quantity > 0) {
      this.setState({ sum: newSum }, () => this.saveSumLocalStorage());
    }
  };

  render() {
    const {
      categories, categoriesProducts, searchInput, productsSearch, cartSaved, sum,
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
              <Cart
                cartSaved={ cartSaved }
                deleteLocalStorageItem={ this.deleteLocalStorageItem }
                handleSum={ this.handleSum }
                handleDecrease={ this.handleDecrease }
                sum={ sum }
              />
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
