import React, { useState, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { IconButton, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCart from '@material-ui/icons/ShoppingCartOutlined';
import Popover from '@material-ui/core/Popover';
import Trash from '@material-ui/icons/RemoveShoppingCart'
import Button from '@material-ui/core/Button';
import Btn from './Button/Button2';
import Botao from './Button/Button';
import { Usuario } from '../Form Login/index';
import { Contexto } from '../../Root/root';
import classes from './estilo';
import { Produtos } from '../Hooks/Produtos';
import api from '../../Services/userServer';
import Api from '../../Services/products';
import { SettingsEthernet } from '@material-ui/icons';

const Header = () => {
  const user = useContext(Usuario);
  const Prod = useContext(Produtos);
  const history = useHistory();
  const estilo = classes();
  const contexto = useContext(Contexto);
  const [search, setSearch] = useState('');
  const [Open, setOpen] = useState(false);
  const [elemento, setElementos] = useState([]);
  const [total, setTotal] = useState();
  const [value, setValue] = useState()
  let aux = 0

  const handleClose = () => {
    setOpen(false);
  };
  async function remover(indice, price) {
    console.log(total)
    console.log('removendo' + indice)
    // await Api.delete(`/products/${indice}`)
    setTotal(total - price)




  }
  useEffect(() => {

  }, [])

  function setar(event) {
    setSearch(event.target.value);
  }
  function mudar() {
    contexto.setPesquisa(search);
    history.push('/');
  }

  function Verificar() {
    return user.valid ? <Botao /> : <Btn />;
  }

  async function cart() {
    const id = JSON.parse(localStorage.getItem('login'));
    const prods = await Api.get('/products  ');
    const prodsValids = prods.data;
    const produtos = prodsValids.filter(e => {
      return (
        e.usuario === id.id
      )
    })

    produtos ? setElementos(produtos) : setElementos(null);
    produtos.map(e => setTotal(total + e.price))

    console.log(total)

  }






  const abrir = () => {
    setOpen(true);
  }

  useEffect(() => {
    return (cart()

    )

  }, [])







  return (
    <div>
      <Grid className={estilo.header} container spacing={0}>
        <Grid item xs={2}>
          <Link
            to="/"
            onClick={() => {
              contexto.setPesquisa(null);
            }}
            style={{ textDecoration: 'none' }}
          >
            <Typography variant="h1" className={estilo.h1}>
              World Promotions
            </Typography>
          </Link>
        </Grid>

        <Grid item xs={7}>
          <Paper component="form" className={estilo.papel}>
            <input
              variant="filled"
              className={estilo.input}
              placeholder="Escolha seu produto"
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={setar}
            />
            <IconButton style={{ padding: 10 }} onClick={() => mudar()}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <div className={estilo.cart}>
          <Link onClick={() => abrir()}>
            <ShoppingCart color="secondary" fontSize="large" />
          </Link>
        </div>

        {console.log(elemento)}
        <Popover open={Open} onClose={handleClose} className={estilo.carrinho}>
          {elemento &&
            elemento.map((e) =>


            (

              <div>

                <div className={estilo.produto}>
                  <img
                    className={estilo.image}
                    alt="produto"
                    src={e.imageUrl}
                  />
                  <div>
                    <Typography className={estilo.title}>{e.title}</Typography>

                    <Typography className={estilo.value}>
                      R$
                      {e.price}
                    </Typography>
                  </div>

                  <div className={estilo.quantidade}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <IconButton onClick={() => remover(e.id, e.price)} className={estilo.btn}>
                        <Trash color='secondary' />
                      </IconButton>
                    </div>

                    <div className={estilo.valor}>
                      <Typography style={{ fontWeight: 1000 }}>
                        R$
                        {e.price}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <div className={estilo.footer}>
            {
              elemento ?
                <Button
                  variant="contained"
                  className={estilo.finalizar}
                >
                  Finalizar
            </Button> :
                <div className={estilo.vazio}>
                  Você ainda não tem produtos no carrinho
                </div>
            }

            <Typography style={{ marginTop: 30 }}> Total:R${total}</Typography>
          </div>
        </Popover>

        <Grid item xs={1}>
          <Verificar />
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
