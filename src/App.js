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
import Checkout from './pages/Checkout';

class App extends React.Component {
  state = {
    categories: [],
    categoriesProducts: [],
    searchInput: '',
    categoryID: '',
    productsSearch: false,
    salvador: [],
    sum: [],
  };

  componentDidMount() {
    this.fetchCategories();
    if (localStorage.getItem('cart')) {
      this.setState({ salvador: JSON.parse(localStorage.getItem('cart')) });
    }
    this.getSumLocalStorage();
    this.getSalvadorLocalStorage();
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
    const { salvador } = this.state;
    localStorage.setItem('cart', JSON.stringify(salvador));
  };

  addCartItem = async ({ target }) => {
    if (target.parentNode.id) {
      const newItem = target.parentNode.id;
      const { categoriesProducts } = this.state;
      const item = categoriesProducts.find((product) => product.id === newItem);
      this.setState((state) => ({
        salvador: [...state.salvador, item],
        sum: [...state.sum, { [item.id]: {
          quantity: 1,
        } }],
      }), async () => {
        await this.saveLocalStorage();
        this.salvadorLocalStorage();
      });
    } else {
      const newItem = target.parentNode.className;
      const { categoriesProducts } = this.state;
      const item = categoriesProducts.find((product) => product.id === newItem);
      this.setState((state) => ({
        salvador: [...state.salvador, item],
        sum: [...state.sum, { [newItem]: {
          quantity: 1,
        } }],
      }), async () => {
        await this.saveLocalStorage();
        this.salvadorLocalStorage();
      });
    }
  };

  deleteLocalStorageItem = ({ target }) => {
    const theId = target.parentNode.firstChild.alt;
    const { salvador } = this.state;
    const newCart = salvador.filter(({ id }) => id !== theId);
    localStorage.setItem('cart', JSON.stringify(newCart));
    this.setState({ salvador: newCart });
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
    const { salvador, sum } = this.state;
    const available = 'available_quantity';
    const theId = target.parentNode.firstChild.alt;
    const item = salvador.find((product) => product.id === theId);
    const index = salvador.indexOf(item);
    const newSum = sum;
    console.log(item[available]);
    if (item[available] > newSum[index][theId].quantity) {
      newSum[index][theId].quantity += 1;
    }

    this.setState({ sum: newSum }, () => this.saveSumLocalStorage());
  };

  handleDecrease = ({ target }) => {
    const { salvador, sum } = this.state;
    const theId = target.parentNode.firstChild.alt;
    const item = salvador.find((product) => product.id === theId);
    const index = salvador.indexOf(item);
    const newSum = sum;
    newSum[index][theId].quantity -= 1;
    if (newSum[index][theId].quantity > 0) {
      this.setState({ sum: newSum }, () => this.saveSumLocalStorage());
    }
  };

  salvadorLocalStorage = () => {
    const { salvador } = this.state;
    localStorage.setItem('cartSalvador', JSON.stringify(salvador));
  };

  getSalvadorLocalStorage = () => {
    if (localStorage.getItem('cartSalvador')) {
      this.setState({ salvador: JSON.parse(localStorage.getItem('cartSalvador')) });
    }
  };

  render() {
    const {
      categories, categoriesProducts, searchInput, productsSearch,
      sum, salvador,
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
              salvador={ salvador }
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
                salvador={ salvador }
              />
            ) }
          />
          <Route
            exact
            path="/cart"
            render={ () => (
              <Cart
                cartSaved={ salvador }
                deleteLocalStorageItem={ this.deleteLocalStorageItem }
                handleSum={ this.handleSum }
                handleDecrease={ this.handleDecrease }
                sum={ sum }
              />
            ) }
          />
          <Route exact path="/checkout" component={ Checkout } />
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
