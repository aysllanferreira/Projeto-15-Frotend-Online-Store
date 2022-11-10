import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkout extends Component {
  state = {
    cart: [],
    validar: true,
    nome: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    endereco: '',
    pagamento: '',
  };

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cart });
  }

  handleClear = () => {
    const { history } = this.props;
    localStorage.clear();
    this.setState({ cart: [] });
    history.push({ pathname: '/' });
    window.location.reload();
  };

  handleValidar = () => {
    const {
      nome, email, cpf, phone, cep, endereco, pagamento,
    } = this.state;
    if (
      nome.length > 0
      && email.length > 0
      && cpf.length > 0
      && phone.length > 0
      && cep.length > 0
      && endereco.length > 0
      && pagamento.length > 0
    ) {
      this.setState({ validar: true });
      this.handleClear();
    } else {
      this.setState({ validar: false });
    }
  };

  onChangeForm = ({ target }) => {
    const { name, value, checked } = target;
    this.setState({ [name]: value || checked });
  };

  render() {
    const {
      cart, validar, nome, email, cpf, phone, cep, endereco, pagamento,
    } = this.state;
    const total = cart.reduce((acc, { price }) => acc + price, 0);
    return (
      <div>
        <div>
          {cart.length > 0 && cart.map((item) => (
            <div key={ item.id }>
              <p data-testid="shopping-cart-product-name">{item.title}</p>
              <p data-testid="shopping-cart-product-quantity">{item.quantity}</p>
              <p data-testid="shopping-cart-product-name">{item.price}</p>

            </div>
          ))}
          <p>{`Total ${total}`}</p>
        </div>

        <div>
          {!validar && <p data-testid="error-msg">Campos inválidos</p>}
          <input
            type="text"
            data-testid="checkout-fullname"
            placeholder="Nome do cara"
            onChange={ this.onChangeForm }
            name="nome"
            value={ nome }
          />
          <input
            type="email"
            data-testid="checkout-email"
            placeholder="email do mano"
            onChange={ this.onChangeForm }
            name="email"
            value={ email }
          />
          <input
            type="text"
            data-testid="checkout-cpf"
            placeholder="cpf do cara"
            onChange={ this.onChangeForm }
            name="cpf"
            value={ cpf }
          />
          <input
            type="text"
            data-testid="checkout-phone"
            placeholder="phone do cara"
            onChange={ this.onChangeForm }
            name="phone"
            value={ phone }
          />
          <input
            type="text"
            data-testid="checkout-cep"
            placeholder="cep do mano"
            onChange={ this.onChangeForm }
            name="cep"
            value={ cep }
          />
          <input
            type="text"
            data-testid="checkout-address"
            placeholder="endereco "
            onChange={ this.onChangeForm }
            name="endereco"
            value={ endereco }
          />
          <input
            type="radio"
            name="pagamento"
            data-testid="ticket-payment"
            value="boleto"
            onChange={ this.onChangeForm }
            checked={ pagamento === 'boleto' }
          />
          <input
            type="radio"
            name="pagamento"
            data-testid="visa-payment"
            value="visa"
            onChange={ this.onChangeForm }
            checked={ pagamento === 'visa' }
          />
          <input
            type="radio"
            name="pagamento"
            data-testid="master-payment"
            value="mastercard"
            onChange={ this.onChangeForm }
            checked={ pagamento === 'mastercard' }
          />
          <input
            type="radio"
            name="pagamento"
            data-testid="elo-payment"
            value="elo"
            onChange={ this.onChangeForm }
            checked={ pagamento === 'elo' }
          />
          <button
            onClick={ this.handleValidar }
            type="submit"
            data-testid="checkout-btn"
          >
            Enviar

          </button>
        </div>

      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
