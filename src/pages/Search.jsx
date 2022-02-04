import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MyCard from '../components/MyCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonSearchTrue: true,
      nameOfBAnd: '',
      inputSearch: '',
      APIisLoading: false,
      responseAPIistrue: false,
      listOfAlbum: [],
      listIsVoid: false,
    };
  }

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      this.checkLengthInput,
    );
  };

  checkLengthInput = () => {
    const { inputSearch } = this.state;
    const minLength = 2;
    if (inputSearch.length >= minLength) {
      this.setState({
        buttonSearchTrue: false,
      });
    } else {
      this.setState({
        buttonSearchTrue: true,
      });
    }
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { inputSearch: nameOfSearch } = this.state;
    this.clearInput();
    this.setState({
      APIisLoading: true,
      responseAPIistrue: false,
    });
    const listOfAlbunsResponse = await searchAlbumsAPI(nameOfSearch);
    this.setState({
      APIisLoading: false,
      responseAPIistrue: true,
      listOfAlbum: listOfAlbunsResponse,
      listIsVoid: this.checkListOfResponseIsVoid(listOfAlbunsResponse),
    });
  };

  checkListOfResponseIsVoid = (array) => {
    if (array.length === 0) {
      return true;
    }
    return false;
  };

  clearInput = () => {
    const { inputSearch } = this.state;
    this.setState({
      nameOfBAnd: inputSearch,
      inputSearch: '',
    });
  };

  render() {
    const {
      inputSearch,
      buttonSearchTrue,
      APIisLoading,
      responseAPIistrue,
      nameOfBAnd,
      listOfAlbum,
      listIsVoid,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <div>
          {APIisLoading ? (
            <Loading />
          ) : (
            <Form
              { ...{ inputSearch, buttonSearchTrue } }
              handleChange={ this.handleChangeInput }
              handleClick={ this.handleClick }
            />
          )}
          <div>
            {responseAPIistrue && (
              <h2>
                {'Resultado de álbuns de: '}
                {nameOfBAnd}
              </h2>
            )}
          </div>
          <div
            style={ {
              display: 'flex',
              maxWidth: '1000px',
              flexWrap: 'wrap',
              margin: 'auto',
              justifyContent: 'space-between',
            } }
          >
            {listIsVoid ? (
              <h2>Nenhum álbum foi encontrado</h2>
            ) : (
              listOfAlbum.map((album) => (
                <Link
                  to={ `/album/${album.collectionId}` }
                  key={ album.collectionId }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <MyCard album={ album } />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
