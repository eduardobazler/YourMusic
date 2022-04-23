import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Header from '../components/Header';
import MyCard from '../components/MyCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      objectCardDetails: {},
      detailsOfAlbum: {},
      listOfMusic: [],
      listFavoritesSongs: [],
    };
  }

  componentDidMount() {
    this.getResponseMusics();
  }

  getResponseMusics = async () => {
    const { match } = this.props;
    const {
      params: { id },
    } = match;

    this.setState({
      loading: true,
    });

    const response = await getMusics(id);
    const listOfResponse = await getFavoriteSongs();

    const listOfIdFavoriteSongs = listOfResponse.map(({ trackId }) => trackId);

    this.setState(
      {
        loading: false,
        detailsOfAlbum: response[0], // o primeiro elemento da reposta é os detalhes.
        listOfMusic: response.slice(1), // fiz isso pra pegar só as musicas.
        listFavoritesSongs: [...listOfIdFavoriteSongs],
      },
      this.createObjectForCard,
    );
  };

  createObjectForCard = () => {
    const { detailsOfAlbum } = this.state;
    const { artistName, artworkUrl100, collectionName } = detailsOfAlbum;
    const objectCard = {
      artworkUrl100,
      artistName,
      collectionName,
    };
    this.setState({
      objectCardDetails: objectCard,
    });
  };

  findObjectMusicInList = (id) => {
    const { listOfMusic } = this.state;
    const objectSongDetails = listOfMusic.find(({ trackId }) => trackId === id);
    return objectSongDetails;
  };

  removeSongOfListFavorites = async (objectMusic) => {
    this.setState({
      loading: true,
    });
    await removeSong(objectMusic);

    this.setState({
      loading: false,
    });
  };

  handleCheckFavorite = async ({ target }) => {
    const songId = Number(target.value);
    const { listFavoritesSongs } = this.state;
    const objectMusic = this.findObjectMusicInList(songId);

    // se cair nesse if é pq a musica já está marcada!
    if (!target.checked) {
      this.removeSongOfListFavorites(objectMusic);
      const indexOfSong = listFavoritesSongs.indexOf(songId);
      listFavoritesSongs.splice(indexOfSong, 1);
    } else {
      this.setState({
        loading: true,
      });

      await addSong(objectMusic);

      this.setState({
        loading: false,
        listFavoritesSongs: [...listFavoritesSongs, songId],
      });
    }
  };

  render() {
    const { loading, objectCardDetails, listOfMusic, listFavoritesSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div style={ { display: 'flex', justifyContent: 'center' } }>
            <MyCard album={ objectCardDetails } />
            <div>
              {listOfMusic.map(({ previewUrl, trackName, trackId }) => (
                <Paper
                  key={ trackName }
                  style={ {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '10px',
                  } }
                >
                  <MusicCard
                    previewUrl={ previewUrl }
                    trackName={ trackName }
                    trackId={ trackId }
                    handleCheck={ this.handleCheckFavorite }
                    isItFavorit={ listFavoritesSongs.includes(trackId) }
                  />
                </Paper>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
