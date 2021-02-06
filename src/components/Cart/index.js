import React, { useState, useContext, useEffect } from 'react'
import Header from '../Header/header'
import estilo from './style.js'
import Api from '../../Services/products'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import { Produtos } from '../Hooks/Produtos'
import Button from '@material-ui/core/Button'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'


function Cart() {
  const [quantidade, setQuantidade] = useState(0)
  const [Total, setTotal] = useState(0)
  const carrinho = useContext(Produtos)
  const [elemento, setElementos] = useState([]);
  const [value, setValue] = useState(0)
  const [Aberto, setAberto] = useState(false);
  const vertical = 'top';
  const horizontal = 'left';
  const [msg, setMsg] = useState('');
  const [result, setResult] = useState('');


  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function abrir() {
    setAberto(true);
  }
  function fechar() {
    setAberto(false);
  }
  async function deletar(props) {
    props.quantidade = props.quantidade - 1
    return (
      await Api.delete(`/products/${props.id}`)
    )
  }
  async function atualizar(props) {
    props.quantidade = props.quantidade - 1
    // carrinho.setProduto(props.quantidade)
    return (
      await Api.put(`http://localhost:2000/products/${props.id}`, props)
    )
  }
  async function remover(elemento) {

    setValue(value + 1)
    elemento.quantidade === 0 ? deletar(elemento) : atualizar(elemento)
  }
  function fechar() {
    setAberto(false);
  }
  async function cart() {
    const id = JSON.parse(localStorage.getItem('login'));
    const prods = await Api.get('/products');
    const prodsValids = prods.data;
    let soma = 0

    const produtos = prodsValids.filter(e => {
      return (
        e.Usuario === id.id

      )
    })
    produtos ? setElementos(produtos) : setElementos(null);
    produtos.length > 0 ? setMsg('Pedido realizado') : setMsg('Você ainda não tem produtos cadastrados')
    produtos.length > 0 ? setResult('success') : setResult('error')
    console.log(result)
  }
  useEffect(() => { cart() }, [value])

  const classes = estilo()


  return (
    <div>
      <Header />
      <div className={classes.footer}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={Aberto}
          onClose={fechar}
          autoHideDuration={5000}
        >
          <Alert severity={result}>
            <div>{msg}</div>
          </Alert>
        </Snackbar>

        <Button
          variant="contained"
          className={classes.finalizar}
          onClick={() => { abrir() }}
        >
          Finalizar
        </Button>
      </div>
      <div className={classes.container}>
        <div className={classes.carrinho}>
          {elemento &&
            elemento.map((e) => (
              <div>
                <div className={classes.produto}>
                  <img
                    className={classes.image}
                    alt="produto"
                    src={e.imageUrl}
                  />
                  <div>
                    <Typography className={classes.title}>{e.title}</Typography>
                    <Typography className={classes.value}>
                      R$
                      {e.price}
                    </Typography>
                  </div>
                  <div className={classes.quantidade}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <IconButton onClick={() => remover(e)} className={classes.btn}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                    <div className={classes.valor}>
                      <Typography cstyle={{ fontWeight: 1000 }}>
                        R${(e.price * e.quantidade).toFixed(0)}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div >
  )
}


export default Cart;