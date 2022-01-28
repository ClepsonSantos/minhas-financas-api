import React from 'react'

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'

import Login from '../views/login'
import Home from '../views/home'
import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaLancamentos from '../views/lacamentos/consulta-lancamentos'
import cadastroLancamentos from '../views/lacamentos/cadastro-lancamentos'
import { AuthConsumer } from '../main/provedorAutenticacao'
import landingPage from '../views/landingPage'

function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props} ){
    return(
        <Route exact {...props} render={ (componentProps) => {
            if(isUsuarioAutenticado){
                return (
                    <Component {...componentProps} />
                );
            } else {
                return (
                    <Redirect to={ {pathname : '/login', state : { from: componentProps.location} } } />
                );
            }
        }} />
    );
}

function Rotas(props){

    return(

        <BrowserRouter >
            <Switch >
                <Route exact path="/" component={landingPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cadastro-usuarios" component={CadastroUsuario} />
                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={cadastroLancamentos} />
            </Switch>
        </BrowserRouter>

    )

}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
    </AuthConsumer>
);