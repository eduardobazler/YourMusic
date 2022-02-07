import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      LoadingName: true,
    };
  }

  componentDidMount() {
    this.getNameUser();
  }

  getNameUser = async () => {
    const user = await getUser();
    this.setState({
      name: user.name,
      LoadingName: false,
    });
  };

  render() {
    const { name, LoadingName } = this.state;
    return (
      <header data-testid="header-component">
        <h3>HEADER</h3>
        <div>
          {LoadingName ? (
            <p>Carregando...</p>
          ) : (
            <p data-testid="header-user-name">{name}</p>
          )}
        </div>
        <div>
          <button type="button" className="btn btn-primary">
            <Link data-testid="link-to-search" to="/search">search</Link>
          </button>
          <button type="button" className="btn btn-primary">
            <Link data-testid="link-to-favorites" to="/favorites">favorites</Link>
          </button>
          <button type="button" className="btn btn-primary">
            <Link data-testid="link-to-profile" to="/profile">profile</Link>
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
