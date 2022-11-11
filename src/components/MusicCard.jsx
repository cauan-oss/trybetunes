import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      check: false,
      isLoading: false,
    };
  }

  addCheck = async (event) => {
    const { mix } = this.props;
    // const { check } = this.state;
    if (event.target.checked) {
      this.setState({
        check: true,
        isLoading: true,
      });
      await addSong(mix);
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { check, isLoading } = this.state;
    const { trackName, previewUrl, mix } = this.props;
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
              checked={ check }
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
