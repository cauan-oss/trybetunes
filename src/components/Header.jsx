import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      isLoading: true,
    };
  }

  async componentDidMount() {
    this.renderGet();
  }

  renderGet = async () => {
    const getUs = await getUser();
    console.log(getUs.name);
    this.setState({ nome: getUs.name });
    this.setState({ isLoading: false });
  };

  render() {
    const { nome, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading ? <p>Carregando...</p>
          : <p data-testid="header-user-name">{ nome }</p> }
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
