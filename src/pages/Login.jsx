import { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      isValidButton: true,
      isLoading: false,
    };
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      const { nome } = this.state;
      const numberTre = 3;
      const emptyValidate = nome.length >= numberTre;
      this.setState({
        isValidButton: !emptyValidate,
      });
    });
  };

  redirectNome = async () => {
    const { history } = this.props;
    const { nome } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: nome });
    this.setState({ isLoading: false });
    history.push('/search');
  };

  render() {
    const { nome, isValidButton, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        { isLoading ? <p>Carregando...</p>
          : (
            <label htmlFor="user">
              <span>nome</span>
              <input
                value={ nome }
                onChange={ this.onInputChange }
                name="nome"
                id="user"
                data-testid="login-name-input"
                type="text"
              />
              <button
                data-testid="login-submit-button"
                disabled={ isValidButton }
                onClick={ this.redirectNome }
                type="button"
              >
                Entrar

              </button>
            </label>)}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
