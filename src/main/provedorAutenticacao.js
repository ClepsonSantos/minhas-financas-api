import React from 'react';
import ApiService from '../app/apiservice';
import AuthService from '../app/service/authService';
import jwt from 'jsonwebtoken';

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class ProvedorAutenticacao extends React.Component {

    state = {
        usuarioAutenticado: null,
        isAutenticado: false,
        isLoading: true
    }

    iniciarSessao = (tokenDTO) => {
        const token = tokenDTO.token;
        console.log('iniciarSessao token: ', token)
        const claims = jwt.decode(token);
        const usuario = {
            id: claims.userid,
            nome: claims.nome
        }

        AuthService.logar(usuario, token);
        this.setState( { isAutenticado: true, usuarioAutenticado: usuario } );
    }

    encerrarSessao = () => {
        AuthService.removerUsuarioAutenticado();
        this.setState( { isAutenticado: false, usuarioAutenticado: null} );
    }

    // método chamado quando entra no componente
    componentDidMount(){
        const isAutenticado = AuthService.isUsuarioAutenticado();
        console.log('componentDidMount. autenticado? ', isAutenticado);

        if(isAutenticado){
            console.log('componentDidMount inside if');
            const usuario = AuthService.refreshSession();

            this.setState({
                isAutenticado: true,
                usuarioAutenticado: usuario,
                isLoading: false
            });
        } else {
            this.setState( previousState => {
                return {
                    ...previousState,
                    isLoading: false
                }
            });
        }
    }

    render(){

        if(this.state.isLoading){
            return null;
        }

        const contexto = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }

        return(
            <AuthProvider value={contexto}>
                {this.props.children}
            </AuthProvider>
        );
    }

}

export default ProvedorAutenticacao;