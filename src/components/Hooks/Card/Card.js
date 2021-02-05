import React, { useEffect, useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Contexto } from '../../../Root/root';
import api from '../../../Services/cardServer.js';
import Api from '../../../Services/products';
import classe from './style';
import { Produtos } from '../Produtos';
import { Usuario } from '../../Form Login/index';
import users from '../../../Services/userServer';

function Card() {
  const User = useContext(Usuario);
  const busca = useContext(Contexto);
  const Cart = useContext(Produtos);
  const estilo = classe();
  const [cards, setCards] = useState();

  let urls;

  useEffect(() => {
    setUrls();
  }, [busca.pesquisa]);

  async function setUrls() {
    busca.pesquisa
      ? (urls = `/promotions?_order=desc&_sort=id&title_like=${busca.pesquisa}`)
      : (urls = '/promotions?_order=desc&_sort=id');

    const response = await api.get(urls);
    setCards(response.data);
  }

  
  async function adicionar(props) {

    const currentUser = JSON.parse(localStorage.getItem('login'));
    const validar = await Api.get(`/products`)
    const semelhante = validar.data.filter(e => {
      return (e.title === props.title && currentUser.id === e.Usuario)
    })

    console.log(semelhante)

    props.Usuario = currentUser.id;


    async function atualizar() {
      props.quantidade = props.quantidade + 1
      Cart.setProduto(props.quantidade)
      console.log(Cart.p)
      return (

        await Api.put(`http://localhost:2000/products/${props.id}`, props)

      )
    }


    async function postar() {
      props.id = props.id + 3
      Cart.setProduto(props.quantidade)
      console.log(Cart.produto)
      return (

        await Api.post(`http://localhost:2000/products`, props)
      )
    }


    User.valid &&
      semelhante.length >= 1 ? atualizar() : postar();






  }
  return (
    <div>
      <Grid className={estilo.pai} container spacing={1} direction="row">
        {cards &&
          cards.map((elemento) => (
            <Grid item xs={3}>
              <Paper className={estilo.paper}>
                <>
                  <a
                    className={estilo.link}
                    href={elemento.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <img
                      className={estilo.image}
                      alt="imagem"
                      src={elemento.imageUrl}
                    />
                  </a>

                  <a
                    className={estilo.link}
                    href={elemento.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Typography className={estilo.title}>
                      {elemento.title}
                    </Typography>
                  </a>
                  <div className={estilo.precoPai}>
                    <span className={estilo.preco}>
                      R$
                      {elemento.price}
                    </span>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => adicionar(elemento)}
                    >
                      Adicionar
                    </Button>
                  </div>
                </>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Card;
