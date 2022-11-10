import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from './services/api';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Category from './components/Category';

class App extends React.Component {
  state = {
    categories: [],
    categoriesProducts: [],
    searchInput: '',
    categoryID: '',
    productsSearch: false,
  };

  componentDidMount() {
    this.fetchCategories();
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
    const response = await getProductsFromCategoryAndQuery(categoryID);
    this.setState({
      categoriesProducts: response.results,
      productsSearch: true,
    });
  };

  handleClick = async ({ target }) => {
    const { id } = target;
    await this.fetchCategorySearch(id);
  };

  render() {
    const {
      categories, categoriesProducts, searchInput, productsSearch,
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
            />) }
          />
          <Route exact path="/cart" component={ Cart } />
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
