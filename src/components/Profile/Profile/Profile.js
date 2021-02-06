import React, { useState, useContext } from 'react';
import { Avatar, Grid, Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from '../../Header/header';
import style from './style.js';
import api from '../../../Services/cardServer';
import Produtos from './Produtos/produtos';
import { Products } from '../Profile/Produtos/produtos'
import { profileImg } from '../Setings/Settings'


function Profile() {

  const estilo = style();
  const data = localStorage.getItem('login');
  const dados = JSON.parse(data);
  const profile = useContext(profileImg)
  const [option, setOption] = useState('');
  let produtos;
  let produto;
  let prod;
  let user;
  let User;
  const verifyProducts = useContext(Products)

  const [products, setProducts] = useState([]);
  async function Buscar() {
    user = localStorage.getItem('login');
    User = JSON.parse(user);

    prod = await api.get('/promotions');
    produtos = prod.data;
    produto = produtos.filter((e) => e.usuario === User.email);
    setProducts(produto);

  }


  return (
    <div>
      <Header />
      <Container className={estilo.Container} component="main" xs="xl">
        <Grid className={estilo.item} item xs={12}>
          <Paper className={estilo.Paper1}>
            <Grid item xs={15} className={estilo.grid1}>
              <Avatar
                src={profile.image}
                style={{
                  width: 133,
                  height: 133,
                  marginLeft: '1%',
                  marginRight: '5%',
                  marginTop: '3%',
                }}
              />
              <Grid item xl={15} className={estilo.grid11}>
                <h1 style={{ fontFamily: 'Arial', color: 'black' }}>{ }</h1>
                <Grid item xs={15} className={estilo.grid111} />
              </Grid>
            </Grid>
            <Produtos />
          </Paper>
        </Grid>
      </Container>
    </div>
  );
}

export default Profile;
