import React from 'react';
import Senha from '../../components/Profile/Senhas/Senhas';
import Header from '../../components/Header/header';
import { Carrinho } from '../../components/Hooks/Produtos';

const Senhas = () => (
  <Carrinho>
    <Header />
    <Senha />
  </Carrinho>
);

export default Senhas;
