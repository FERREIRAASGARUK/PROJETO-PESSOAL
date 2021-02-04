import React,{useState} from 'react'
import Header from '../Header/header'
import estilo from './style.js'
import Api from '../../Services/products'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';



 function Cart (){



        const [elemento, setElementos] = useState([]);
        const [value, setValue] = useState(0)
         const [Aberto, setAberto] = useState(false);
         async function deletar(props){ 
        props.quantidade =  props.quantidade -1
        Cart.setProduto(props.quantidade)
        
        return ( 
          
          await Api.delete(`/products/${props.id}`)
          
          )}

        async function atualizar(props){ 
        props.quantidade =  props.quantidade -1
        Cart.setProduto(props.quantidade)
        
    return ( 
      
      await Api.put(`http://localhost:2000/products/${props.id}`,props)
      
      )}
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
                const produtos = prodsValids.filter(e => {
                return (
                    e.Usuario === id.id
                    
                )
                })

    produtos ? setElementos(produtos) : setElementos(null);
                console.log(elemento)
  }
    cart()
    const classes = estilo()

        
    return(
        <div>
            <Header/>
            <div className={classes.carrinho}>
        {elemento &&
            elemento.map((e) =>(

              <div>

                <div className={classes.produto}>
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
                      <IconButton onClick={() => remover(e)} className={estilo.btn}>
                       <DeleteIcon/>
                      </IconButton>
                    </div>

                    <div className={estilo.valor}>
                      <Typography style={{ fontWeight: 1000 }}>
                        
                        {(e.quantidade).toFixed(0)}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
        </div>

    )
 }


 export default Cart;