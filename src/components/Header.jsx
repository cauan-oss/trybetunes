import { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;
