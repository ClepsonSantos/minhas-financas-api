import React from "react";
import LocalStorageService from "../app/service/localStorageService";
import UsuarioService from "../app/service/usuarioService";
import { AuthContext } from '../main/provedorAutenticacao';

class Home extends React.Component {

    state = {
        saldo: 0
    }

    constructor(){
        super();
        this.serviceUsuario = new UsuarioService();
    }

    componentDidMount(){

        const usuarioLogado = this.context.usuarioAutenticado; // modo antigo: LocalStorageService.obterItem('_usuario_logado');

        console.log('usuario logado> ', usuarioLogado.id)

        this.serviceUsuario
            .obterSaldoPorUsuario(usuarioLogado.id)
            .then(response => {
                this.setState({saldo: response.data});
            }).catch(erro => {
                console.log(erro.response);
            });
    }

    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                <a className="btn btn-primary btn-lg" 
                   href="/cadastro-usuarios" 
                   role="button"><i className="pi pi-users"></i>
                   Cadastrar Usuário
                </a>
                <a className="btn btn-danger btn-lg" 
                   href="/cadastro-lancamentos" 
                   role="button"><i className="pi pi-money-bill"></i>  
                   Cadastrar Lançamento
                </a>
                </p>
            </div>
        )
    }

}

Home.contextType = AuthContext;

export default Home;