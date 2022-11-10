import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Rating extends Component {
  render() {
    const {
      handleChanges, permission, email, evaluation, handleClick, result,
    } = this.props;
    return (
      <div>
        <input
          data-testid="product-detail-email"
          type="email"
          id="email"
          onChange={ handleChanges }
          value={ email }
        />
        <input type="radio" name="rate" value={ 1 } data-testid="1-rating" />
        <input type="radio" name="rate" value={ 2 } data-testid="2-rating" />
        <input type="radio" name="rate" value={ 3 } data-testid="3-rating" />
        <input type="radio" name="rate" value={ 4 } data-testid="4-rating" />
        <input type="radio" name="rate" value={ 5 } data-testid="5-rating" />
        <textarea
          data-testid="product-detail-evaluation"
          cols="30"
          rows="10"
          id="evaluation"
          onChange={ handleChanges }
          value={ evaluation }
        />
        <button
          type="button"
          data-testid="submit-review-btn"
          onClick={ handleClick }
        >
          Avaliar
        </button>
        <div>
          {result.length > 0 && result.map((item, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">{item.email}</p>
              <p data-testid="review-card-evaluation">{item.evaluation}</p>
              <p data-testid="review-card-rating">{item.rating}</p>
            </div>
          ))}
          {permission && <p data-testid="error-msg">Campos inválidos</p>}
        </div>
      </div>
    );
  }
}

Rating.propTypes = {
  handleChanges: PropTypes.func.isRequired,
  permission: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  evaluation: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  result: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    evaluation: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
  })).isRequired,
};

export default Rating;
