import { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artista: '',
      isValidButton: true,
    };
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      const { artista } = this.state;
      const numberTwo = 2;
      const emptyValidate = artista.length >= numberTwo;
      this.setState({
        isValidButton: !emptyValidate,
      });
    });
  };

  render() {
    const { artista, isValidButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <label htmlFor="artist">
            <input
              value={ artista }
              onChange={ this.onInputChange }
              name="artista"
              placeholder="nome de artista"
              id="artist"
              data-testid="search-artist-input"
              type="text"
            />
          </label>
          <button
            disabled={ isValidButton }
            onClick={ this.onInputChange }
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar

          </button>
        </div>
      </div>
    );
  }
}

export default Search;
