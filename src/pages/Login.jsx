import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../components/Loading';
import './login.css';

class Login extends React.Component {
  render() {
    const { handleChange,
      valueInput, buttonOff, clickLogin, loading, loginIsTrue } = this.props;

    return (
      <main className="main-login" data-testid="page-login">
        <h1>Musicas da galera!</h1>
        {loginIsTrue && <Redirect to="/search" />}

        {loading ? (
          <Loading />
        ) : (
          <form className="card main-form">
            <label htmlFor="userName">
              Nome:
              <input
                className="form-control"
                data-testid="login-name-input"
                type="text"
                id="userName"
                name="userName"
                onChange={ handleChange }
                value={ valueInput }
              />
            </label>
            <button
              className="btn btn-primary"
              data-testid="login-submit-button"
              type="submit"
              disabled={ buttonOff }
              onClick={ clickLogin }
            >
              Entrar
            </button>
          </form>
        )}
      </main>
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
