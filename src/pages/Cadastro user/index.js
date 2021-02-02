import React from 'react';
import Cadastro from '../../components/Form Cadastro/index';
import Header from '../../components/Header/header';
import { Carrinho } from '../../components/Hooks/Produtos';

function CadastrarUser() {
  return (
    <Carrinho>
      <Header />
      <Cadastro />
    </Carrinho>
  );
}

export default CadastrarUser;
