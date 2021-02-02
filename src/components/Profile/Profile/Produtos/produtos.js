import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import estilos from './estilo';
import api from '../../../../Services/cardServer';

const Produtos = () => {
  const estilo = estilos();
  let produtos;
  let produto;
  let prod;
  let user;
  let User;

  const [products, setProducts] = useState([]);
  async function Buscar() {
    user = localStorage.getItem('login');
    User = JSON.parse(user);

    prod = await api.get('/promotions');
    produtos = prod.data;
    produto = produtos.filter((e) => e.usuario === User.email);
    setProducts(produto);
  }
  Buscar();

  return (
    <div>
      <h1 style={{ fontFamily: 'Arial' }}>SEUS PRODUTOS CADASTRADOS</h1>
      <Grid className={estilo.pai} container spacing={0} direction="row">
        {products.map((elemento) => (
          <Grid item xs={3}>
            <Paper className={estilo.paper}>
              <>
                <a
                  className={estilo.link}
                  href={elemento.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img className={estilo.image} src={elemento.imageUrl} />
                </a>

                <a
                  className={estilo.link}
                  href={elemento.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Typography className={estilo.title} color="primary">
                    {elemento.title}
                  </Typography>
                </a>
                <div className={estilo.precoPai}>
                  <span className={estilo.preco}>
                    R$
                    {elemento.price}
                  </span>
                </div>
              </>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Produtos;
