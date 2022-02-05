import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';

class MusicCard extends React.Component {
  render() {
    const { previewUrl, trackName, trackId, handleCheck, isItFavorit } = this.props;
    return (
      <div>
        <Paper
          key={ trackName }
          style={ {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px',
            width: 'auto',
          } }
        >
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label htmlFor={ trackName }>
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id={ trackName }
              value={ trackId }
              onChange={ handleCheck }
              checked={ isItFavorit }
            />
          </label>
        </Paper>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  handleCheck: PropTypes.func.isRequired,
  isItFavorit: PropTypes.bool.isRequired,
};

export default MusicCard;
