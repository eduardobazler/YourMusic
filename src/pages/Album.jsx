import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MyCard from '../components/MyCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      objectCardDitails: {},
      detailsOfAlbum: [],
      listOfMusic: [],
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

    this.setState(
      {
        loading: false,
        detailsOfAlbum: response[0], // o primeiro elemento da reposta é os detalhes.
        listOfMusic: response.filter((_currten, index) => index !== 0), // fiz isso pra pegar só as musicas.
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
      objectCardDitails: objectCard,
    });
  };

  render() {
    const { loading, objectCardDitails, listOfMusic } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div style={ { display: 'flex', justifyContent: 'center' } }>
            <MyCard album={ objectCardDitails } />
            <div>
              {listOfMusic.map(({ previewUrl, trackName }) => (
                <MusicCard
                  previewUrl={ previewUrl }
                  trackName={ trackName }
                  key={ trackName }
                />
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
