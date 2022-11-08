import { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      /* musics: '', */
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
    console.log(info);
    this.setState({ testMusic: test.slice(1),
      isLoading: false,
      albumInfo: objQualquer });
  }

  render() {
    const { testMusic, musics, isLoading, albumInfo } = this.state;
    console.log(testMusic);
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
              <MusicCard trackName={ mix.trackName } previewUrl={ mix.previewUrl } />
            </li>

          )) }
        </ol>
      </div>
    );
  }
}

export default Album;
