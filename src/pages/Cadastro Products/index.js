import React from 'react';
import Cadastro from '../../components/Form Promo/index';
import Header from '../../components/Header/header';
import { Carrinho } from '../../components/Hooks/Produtos';

const CadastroProducts = () => (
  <Carrinho>
    <Header />
     <Cadastro />
  </Carrinho>
);

export default CadastroProducts;
