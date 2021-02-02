import React from 'react';
import Login from '../../components/Form Login/index.js';
import Header from '../../components/Header/header';
import { Carrinho } from '../../components/Hooks/Produtos';

const Sign = () => (
  <Carrinho>
    <Header />
    <Login />
  </Carrinho>
);

export default Sign;
