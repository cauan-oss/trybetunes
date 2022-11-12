import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      check: false,
      isLoading: false,
      nomeDo: [],
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    this.setState({ isLoading: true });
    const meuAPi = await getFavoriteSongs();
    console.log(meuAPi);
    this.setState({ check: meuAPi.find((callback) => callback.trackId === trackId),
      isLoading: false });
  }

  addCheck = async (event) => {
    console.log(event);
    const { mix } = this.props;
    this.setState({
      check: true,
      isLoading: true,
    });
    await addSong(mix);
    this.setState({ isLoading: false });
  };

  render() {
    const { check, isLoading } = this.state;
    const { trackName, previewUrl, mix } = this.props;
    const qualqueNome = localStorage.getItem('favorite_songs');
    return (
      <div>
        <p>{ trackName }</p>
        <li>

          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          {isLoading && <p>Carregando...</p>}
          <label htmlFor={ trackName }>
            Favorita
            <input
              data-testid={ `checkbox-music-${mix.trackId}` }
              onChange={ this.addCheck }
              checked={ qualqueNome.includes(mix.trackId) }
              name="check"
              id={ mix.trackName }
              type="checkbox"
            />
          </label>
        </li>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,

}.isRequired;

export default MusicCard;
