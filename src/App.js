import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      buttonLoginIsDisabled: true,
      loading: false,
      loginIsTrue: false,
    };
  }

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      this.checkLengthUser,
    );
  };

  checkLengthUser = () => {
    const { userName } = this.state;
    const minLength = 3;
    if (userName.length >= minLength) {
      this.setState({
        buttonLoginIsDisabled: false,
      });
    } else {
      this.setState({
        buttonLoginIsDisabled: true,
      });
    }
  };

  handleClickLogin = async (event) => {
    event.preventDefault();
    const { userName } = this.state;
    const objectUser = {
      name: userName,
    };

    this.setState({
      loading: true,
    });
    await createUser(objectUser);

    this.setState({
      loading: false,
      loginIsTrue: true,
    });
  }

  render() {
    const { buttonLoginIsDisabled, userName, loading, loginIsTrue } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (
              <Login
                { ...props }
                handleChange={ this.handleChangeInput }
                valueInput={ userName }
                buttonOff={ buttonLoginIsDisabled }
                clickLogin={ this.handleClickLogin }
                loading={ loading }
                loginIsTrue={ loginIsTrue }
              />
            ) }
          />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" render={ () => <Album /> } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
