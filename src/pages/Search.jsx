import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonSearchTrue: true,
      inputSearch: '',
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

  render() {
    const { inputSearch, buttonSearchTrue } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <div>
          <Form
            { ...{ inputSearch, buttonSearchTrue } }
            handleChange={ this.handleChangeInput }
          />
        </div>
      </div>
    );
  }
}

export default Search;
