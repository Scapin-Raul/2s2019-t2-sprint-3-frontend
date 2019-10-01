import React,{Component} from 'react';

import Rodape from '../../components/Rodape/Rodape'
import logo from "../../assets/img/icon-login.png"
import Axios from 'axios';

class Login extends Component{
    
    constructor(){
        super();
        this.state={
            email: '',
            senha: '',
            erro: ''
        }
    }

    atualizaEstadoEmail = (e) =>{
        this.setState({email: e.target.value})
    }

    atualizaEstadoSenha = (e) =>{
        this.setState({senha: e.target.value})
    }
        
    efetuarLogin = (e) =>{
        e.preventDefault();
        console.log(this.state)

        Axios.post('http://192.168.7.85:5000/api/login', {email: this.state.email, senha: this.state.senha})
        .then(response => {if (response.status === 200) {
            console.log(response.data.token);
            localStorage.setItem('Token',response.data.token);
            this.props.history.push("/categorias");
        }else{ 
            console.log('kkdoideira');
        }
        })
        .catch(error => {
            this.setState({erro: "Bro, o usuario ou senha ta inválido."});
            console.log(error);
        })
    }   

        
    
    
    render(){
        return(
        <section className="container flex">
        <div className="img__login"><div className="img__overlay"></div></div>

        <div className="item__login">
            <div className="row">
            <div className="item">
                <img src={logo} className="icone__login" />
            </div>
            <div className="item" id="item__title">
                <p className="text__login" id="item__description">
                Bem-vindo! Faça login para acessar sua conta.
                </p>
            </div>
            <form>
                <p className="text__login"
                   style={{color: 'red', textAlign: 'center'}}
                >
                    {this.state.erro}
                </p>
                <div className="item">
                <input
                    className="input__login"
                    placeholder="username"
                    type="text"
                    name="username"
                    id="login__email"
                    onInput={this.atualizaEstadoEmail}
                    />
                </div>
                <div className="item">
                <input
                    className="input__login"
                    placeholder="password"
                    type="password"
                    name="password"
                    id="login__password"
                    onInput={this.atualizaEstadoSenha}
                    />
                </div>
                <div className="item">
                <button className="btn btn__login" id="btn__login" onClick={this.efetuarLogin}>
                    Login
                </button>
                </div>
            </form>
        <Rodape/>
            </div>
        </div>
        </section>
        );
    }
}

export default Login;