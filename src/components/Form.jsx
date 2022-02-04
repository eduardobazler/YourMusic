import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

class Form extends React.Component {
  render() {
    const { buttonSearchTrue, inputSearch, handleChange } = this.props;
    return (
      <form>
        <input
          data-testid="search-artist-input"
          id="input-search"
          name="inputSearch"
          label="Search Artista"
          type="search"
          variant="standard"
          value={ inputSearch }
          onChange={ handleChange }
        />
        <Button
          variant="contained"
          type="button"
          data-testid="search-artist-button"
          disabled={ buttonSearchTrue }
        >
          Pesquisar
        </Button>
      </form>
    );
  }
}

Form.propTypes = {
  buttonSearchTrue: PropTypes.bool.isRequired,
  inputSearch: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Form;
