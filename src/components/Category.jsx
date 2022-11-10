import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Category extends Component {
  render() {
    const { handleChange, categories } = this.props;
    return (
      <div>
        {categories.map(({ id, name }) => (
          <button
            data-testid="category"
            type="button"
            key={ id }
            id={ id }
            onClick={ handleChange }
          >
            {name}

          </button>
        ))}
      </div>
    );
  }
}

Category.propTypes = {
  handleChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default Category;
