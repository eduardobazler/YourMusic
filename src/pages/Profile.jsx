import React from 'react';
import { Link } from 'react-router-dom';
/* import Avatar from '@mui/material/Avatar'; */
import Button from '@mui/material/Button';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      currentUser: {},
    };
  }

  componentDidMount() {
    this.getInformationOfCurrentUser();
  }

  getInformationOfCurrentUser = async () => {
    this.setState({
      loading: true,
    });

    const currentUserResponse = await getUser();
    console.log(currentUserResponse);

    this.setState({
      loading: false,
      currentUser: currentUserResponse,
    });
  };

  render() {
    const { loading, currentUser } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
        <main
          style={ { backgroundColor: 'white', width: '360px', margin: 'auto' } }
        >
          {loading ? (
            <Loading />
          ) : (
            <div>
              <div
                className="image-user"
                style={ {
                  display: 'flex',
                  margin: 'auto',
                  justifyContent: 'space-around',
                } }
              >
                <img
                  data-testid="profile-image"
                  alt="Remy Sharp"
                  src={ currentUser.image }
                  sx={ { width: 56, height: 56 } }
                />
                <Link to="/profile/edit">
                  <Button variant="outlined">Editar perfil</Button>
                </Link>
              </div>
              <div>
                <div>
                  <h2>Nome:</h2>
                  <p>{currentUser.name}</p>
                </div>
                <div>
                  <h2>Email:</h2>
                  <p>{ currentUser.email }</p>
                </div>
                <div>
                  <h2>description:</h2>
                  <p>{ currentUser.description }</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default Profile;
