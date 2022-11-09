import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Category extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const fetch = await getCategories();
    this.setState({
      categories: fetch,
    });
    return fetch;
  };

  render() {
    const { categories } = this.state;
    return (
      <div>
        {categories.map(({ id, name }) => (
          <button
            data-testid="category"
            type="button"
            key={ id }
          >
            {name}

          </button>
        ))}
      </div>
    );
  }
}

export default Category;
