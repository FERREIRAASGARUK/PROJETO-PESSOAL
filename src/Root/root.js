import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home/home';
import FormProducts from '../pages/Cadastro Products/index';
import FormUser from '../pages/Cadastro user';
import Sign from '../pages/Login/index';
import Perfil from '../components/Profile/Profile/Profile';
import Settings from '../components/Profile/Setings/Settings';
import PrivateRoute from './privateRout.';
import { Validar } from '../components/Form Login/index';
import Senhas from '../pages/password update/index.js';
import { VerificarProdutos } from '../components/Profile/Profile/Produtos/produtos';
import { Profile } from '../components/Profile/Setings/Settings';
import Cart from '../components/Cart/index';


export const Contexto = createContext();
const Root = () => {
  const [pesquisa, setPesquisa] = useState('');
  return (
    <BrowserRouter>
      <Switch>
        <Contexto.Provider value={{ pesquisa, setPesquisa }}>
          <Validar>
            <VerificarProdutos>
              <Profile>
                <PrivateRoute exact path="/Settings" component={Settings} />
                <PrivateRoute exact path="/Perfil" component={Perfil} />
                <PrivateRoute exact path="/Criar" component={FormProducts} />
                <PrivateRoute exact path='/Cart' component={Cart} />
                <Route exact path="/" component={Home} />
                <Route exact path="/Register" component={FormUser} />
                <Route exact path="/Login" component={Sign} />
                <Route exact path="/Senha" component={Senhas} />
              </Profile>
            </VerificarProdutos>
          </Validar>
        </Contexto.Provider>
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
