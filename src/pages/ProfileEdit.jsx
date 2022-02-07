import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      buttonEnviarDisabled: true,
      userName: '',
      userEmail: '',
      userDescription: '',
      userImage: '',
      redirect: false,
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

    this.setState({
      loading: false,
      userName: currentUserResponse.name,
      userEmail: currentUserResponse.email,
      userDescription: currentUserResponse.description,
      userImage: currentUserResponse.image,
    }, this.validationForm);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      this.validationForm,
    );
  };

  validationForm = () => {
    const { userName, userEmail, userDescription, userImage } = this.state;
    const arrayData = [userDescription, userEmail, userName, userImage];
    const isValid = arrayData.every((element) => element !== '');
    let emailIsvalid = true;

    if (
      !userEmail.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      )
    ) {
      emailIsvalid = false;
    }

    if (isValid && emailIsvalid) {
      this.setState({
        buttonEnviarDisabled: false,
      });
    } else {
      this.setState({
        buttonEnviarDisabled: true,
      });
    }
  };

  handleClick = async () => {
    const { userName, userEmail, userDescription, userImage } = this.state;
    const objectUser = {
      name: userName,
      email: userEmail,
      description: userDescription,
      image: userImage,
    };

    this.setState({
      loading: true,
    });

    await updateUser(objectUser);

    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const {
      loading,
      userName,
      userEmail,
      userDescription,
      userImage,
      buttonEnviarDisabled,
      redirect,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        {redirect && <Redirect to="/profile" />}
        <Header />
        <main>
          {loading ? (
            <Loading />
          ) : (
            <div>
              <form>
                <label htmlFor="userImage">
                  Imagen User:
                  <input
                    type="text"
                    id="userImage"
                    data-testid="edit-input-image"
                    value={ userImage }
                    name="userImage"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="userName">
                  Nome:
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    data-testid="edit-input-name"
                    value={ userName }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="userEmail">
                  Email:
                  <input
                    name="userEmail"
                    type="text"
                    id="userEmail"
                    data-testid="edit-input-email"
                    value={ userEmail }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="userDescription">
                  Descrição:
                  <input
                    type="text"
                    id="userDescription"
                    name="userDescription"
                    data-testid="edit-input-description"
                    value={ userDescription }
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ buttonEnviarDisabled }
                  onClick={ this.handleClick }
                >
                  Save
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default ProfileEdit;
