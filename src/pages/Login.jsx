import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../components/Loading';

class Login extends React.Component {
  render() {
    const { handleChange,
      valueInput, buttonOff, clickLogin, loading, loginIsTrue } = this.props;

    return (
      <div data-testid="page-login">
        <h1>Musicas da galera!</h1>
        {loginIsTrue && <Redirect to="/search" />}

        {loading ? (
          <Loading />
        ) : (
          <form>
            <label htmlFor="userName">
              Nome:
              <input
                data-testid="login-name-input"
                type="text"
                id="userName"
                name="userName"
                onChange={ handleChange }
                value={ valueInput }
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={ buttonOff }
              onClick={ clickLogin }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  handleChange: PropTypes.func.isRequired,
  valueInput: PropTypes.string.isRequired,
  buttonOff: PropTypes.bool.isRequired,
  clickLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loginIsTrue: PropTypes.bool.isRequired,
};

export default Login;
