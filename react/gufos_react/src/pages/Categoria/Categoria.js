import React,{Component} from 'react';
import logo from '../../assets/img/icon-login.png'

import Rodape from '../../components/Rodape/Rodape'


class Categoria extends Component{

    constructor(){
        super();
        this.state = {
            lista: [
                // {idCategoria: 1, nome: "Design"},
                // {idCategoria: 2, nome: "Joojos"},
                // {idCategoria: 3, nome: "Meetup"},
            ],
            nome: ''
        }
    }

    componentDidMount(){
        fetch('http://192.168.7.85:5000/api/categorias')
        .then(response => response.json())
        .then(data => this.setState({ lista: data}))
        .catch(error => console.log(error));
    }

    atualizarNome = (e) =>{
      e.preventDefault();
      this.setState({nome: e.target.value});
    }


    adicionarItem = (e) =>{
      e.preventDefault();
      fetch('http://192.168.7.85:5000/api/categorias',{
        method: 'POST', body: JSON.stringify({nome: this.state.nome}),
        headers: {"Content-Type": "application/json"}
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));

      
    };
      
    adicionaCategoria = (e) =>{
      fetch('http://192.168.7.85:5000/api/categorias')
        .then(response => response.json())
        .then(data => this.setState({ lista: data}))
        .catch(error => console.log(error));


    }    



    render(){
         return (
            <div>
            <header className="cabecalhoPrincipal">
              <div className="container">
                <img src={logo} />
      
                <nav className="cabecalhoPrincipal-nav">
                  Administrador
                </nav>
              </div>
            </header>
      
            <main className="conteudoPrincipal">
              <section className="conteudoPrincipal-cadastro">
                <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
                <div className="container" id="conteudoPrincipal-lista">
                  <table id="tabela-lista">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Título</th>
                      </tr>
                    </thead>
      
                    <tbody id="tabela-lista-corpo">
                        {this.state.lista.map(element =>{
                            return (
                                <tr>
                                    <td>{element.idCategoria}</td>
                                    <td>{element.nome}</td>

                                </tr>

                            )

                        })}

                    </tbody>
                  </table>
                </div>
      
                <div className="container" id="conteudoPrincipal-cadastro">
                  <h2 className="conteudoPrincipal-cadastro-titulo">
                    Cadastrar Categoria
                  </h2>
                  <form>
                    <div className="container">
                      <input
                        type="text"
                        className="class__categoria"
                        id="input__categoria"
                        placeholder="tipo do evento"
                        value={this.state.nome}
                        onChange={this.atualizarNome}
                        />
                      <button
                        id="btn__cadastrar"
                        className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                        onClick={this.adicionarItem}
                      >
                        Cadastrar
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            </main>

            <Rodape />

          </div>
         )
    }
}

export default Categoria;