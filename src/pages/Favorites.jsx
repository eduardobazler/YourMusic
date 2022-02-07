import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      listFavoritesSongs: [],
      loading: false,
      isItFavorit: true,
    };
  }

  componentDidMount() {
    this.getFavoriteSongsOfStorage();
  }

  getFavoriteSongsOfStorage = async () => {
    this.setState({
      loading: true,
    });

    const responseListOfSongs = await getFavoriteSongs();

    this.setState({
      loading: false,
      listFavoritesSongs: responseListOfSongs,
    });
  };

  handleCheckFavorite = async ({ target }) => {
    const songId = Number(target.value);
    const { listFavoritesSongs } = this.state;
    const objectMusic = listFavoritesSongs.find(({ trackId }) => trackId === songId);

    this.setState({
      loading: true,
    });

    await removeSong(objectMusic);

    this.getFavoriteSongsOfStorage();
  }

  render() {
    const { loading, listFavoritesSongs, isItFavorit } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        <div>
          {loading ? (
            <Loading />
          ) : (
            <div>
              {listFavoritesSongs.map(({ previewUrl, trackName, trackId }) => (
                <MusicCard
                  key={ trackId }
                  previewUrl={ previewUrl }
                  trackName={ trackName }
                  trackId={ trackId }
                  handleCheck={ this.handleCheckFavorite }
                  isItFavorit={ isItFavorit }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Favorites;
