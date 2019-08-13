import React, { Component } from 'react';
import moment from 'moment';
import logo from '../../assets/logo.png';
import { Container, Form } from './styles';
import CompareList from '../../components/CompareLIst';
import api from '../../services/api';

class Main extends Component {
  state = {
    repositoryInput: '',
    repositories: [],
    repositoryError: false,
    loading: false,
  };

  handleAddReposiotry = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const { repositoryInput, repositories } = this.state;
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();
      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });
    } catch (error) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      repositoryInput, repositoryError, loading, repositories,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="Lista Produtos" />

        <Form withError={repositoryError} onSubmit={this.handleAddReposiotry}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'Ok'}</button>
        </Form>
        <CompareList repositories={repositories} />
      </Container>
    );
  }
}

export default Main;
