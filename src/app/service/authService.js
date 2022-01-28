import LocalStorageService from "./localStorageService";

import jwt from 'jsonwebtoken'
import ApiService from "../apiservice";

export const USUARIO_LOGADO = '_usuario_logado';
export const TOKEN = 'access_token';

export default class AuthService {

    static isUsuarioAutenticado(){
        try {
            //const usuario = LocalStorageService.obterItem(USUARIO_LOGADO);
            const token = LocalStorageService.obterItem(TOKEN);
            const decodedToken = jwt.decode(token);
            const expiration = decodedToken.exp

            console.log('2 token: ', token);

            const isTokenInvalido = Date.now() >= (expiration * 1000);
            
            //return usuario && usuario.id;
            return !isTokenInvalido;
        } catch (err) {
            return false;
        }
    }

    static removerUsuarioAutenticado(){
        LocalStorageService.removerItem(USUARIO_LOGADO);
        LocalStorageService.removerItem(TOKEN);
    }

    static logar(usuario, token){
        console.log('logar');
        LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario);
        LocalStorageService.adicionarItem(TOKEN, token);
        ApiService.registrarToken(token);
    }

    static obterUsuarioLogado(){
        return LocalStorageService.obterItem(USUARIO_LOGADO);
    }

    static refreshSession(){
        const token = LocalStorageService.obterItem(TOKEN);
        const usuario = AuthService.obterUsuarioLogado();
        console.log('refreshSession user', usuario);
        AuthService.logar(usuario, token);

        return usuario;
    }

}