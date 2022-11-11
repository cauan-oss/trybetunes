import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      testMusic: [],
      isLoading: false,
      albumInfo: {},

    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ isLoading: true });
    const test = await getMusics(id);
    const info = test[0];
    const objQualquer = {
      artist: info.artistName,
      nameAlbum: info.collectionName,
    };
    this.setState({ testMusic: test.slice(1),
      isLoading: false,
      albumInfo: objQualquer });
  }

  render() {
    const { testMusic, isLoading, albumInfo } = this.state;
    if (isLoading) return <p>Carregando...</p>;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <p data-testid="artist-name">{ albumInfo.artist }</p>
          <p data-testid="album-name">{ albumInfo.nameAlbum }</p>

        </div>
        <ol>

          { testMusic.map((mix) => (
            <li key={ mix.id }>
              <MusicCard
                trackName={ mix.trackName }
                previewUrl={ mix.previewUrl }
                mix={ mix }
              />
            </li>

          )) }
        </ol>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
