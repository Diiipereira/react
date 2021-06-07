import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component { 
    state = { // Estado recebendo dados via API e imprimindo como array
      posts: [], // STATE controla a renderização de todos os elementos do código/sistema
      allPosts: [],
      page: 0,
      postsPerPage: 9,
      searchValue: ''
    };

    async componentDidMount() {
      await this.loadPosts(); 
    }

    loadPosts = async () => { // Função para carregar as publicações
      const { page, postsPerPage } = this.state;

      const postsAndPhotos = await loadPosts();
      this.setState({ 
        posts: postsAndPhotos.slice(page, postsPerPage),
        allPosts: postsAndPhotos, 
      });
    }

    loadMorePosts = () => { // Função para carregar mais publicações pelo botão configurado
      const {
        page,
        postsPerPage,
        allPosts,
        posts
      } = this.state;
      const nextPage = page + postsPerPage;
      const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
      posts.push(...nextPosts);

      this.setState({ 
        ...this.state,
        posts, 
        page: nextPage
       });
    }

    handleInputChange = (event) => { // Função de input de texto
      const value = event.currentTarget.value;
      this.setState({ ...this.state, searchValue: value});
    }

  render() {
    const { 
      posts, 
      page, 
      postsPerPage, 
      allPosts, 
      searchValue } = this.state;

    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
     ? 
    allPosts.filter(post => post.title.toLowerCase().includes(
        searchValue.toLowerCase()
    )) 
    : 
    posts;

    return (
      <section className="container">
        <div className="search-container">
        {!!searchValue && (
          <h1>Search Value: {searchValue}</h1>
        )}

          <TextInput // Função onde recebe o input de texto e faz a validação
            actionFn={this.handleInputChange}
            inputValue={searchValue}
            />
        </div>
        
        {filteredPosts.length > 0 &&( // Onde busca os posts por letras que contenham na publicação
        <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 &&( // Quando não encontra o post, exibe uma mensagem na tela
        <p>Não existem posts com esse nome!</p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button // Botão que carrega masis publicações na página
              text="Carregar Mais Publicações"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

