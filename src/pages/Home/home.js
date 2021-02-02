import React from 'react';
import Card from '../../components/Hooks/Card/Card';
import Header from '../../components/Header/header';
import { Carrinho } from '../../components/Hooks/Produtos';

const Home = () => (
  <Carrinho>
    <Header />
    <Card />
  </Carrinho>
);
export default Home;
