import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artista: '',
      isValidButton: true,
      returnSearch: [],
      returnText: '',
      isLoading: false,
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

  searchArtist = async () => {
    this.setState({ isLoading: true });
    const { artista } = this.state;
    const test = await searchAlbumsAPI(artista);
    this.setState({
      returnSearch: test,
      returnText: artista,
      artista: '',
      isLoading: false,
    });
  };

  render() {
    const { artista, isValidButton, returnSearch, returnText, isLoading } = this.state;
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
            onClick={ this.searchArtist }
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar

          </button>
          {isLoading
              || (
                <span id="resultados">
                  { returnSearch.length > 0
                    ? `Resultado de álbuns de: ${returnText}`
                    : 'Nenhum álbum foi encontrado' }
                </span>) }
          { isLoading ? <p>Carregando...</p>
            : returnSearch.length > 0 && returnSearch.map((art) => (
              <div id="artista" key={ art.artistId }>
                <Link
                  to={ `/album/${art.collectionId}` }
                  data-testid={ `link-to-album-${art.collectionId}` }
                >
                  <p id="titulo">{ art.artistName }</p>
                  <p>{ art.collectionId }</p>
                  <p>{ art.collectionName }</p>
                  <p>{ art.collectionPrice }</p>
                  <p>{ art.artworkUrl100 }</p>
                  <p>{ art.releaseDate }</p>
                  <p>{ art.trackCount }</p>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Search;
