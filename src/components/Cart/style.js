import { makeStyles } from '@material-ui/styles'


const estilo = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: 5000
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100
  },
  finalizar:
  {
    background: '#00FF00',
    marginLeft: 30,
    marginTop: 30,
    width: 133,
    height: 33,
  },
  footer: {
    height: 100,
    width: 1000,
    marginTop: 200,
    marginBottom: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    marginLeft: 150,
    background: '#1976d2',
  },
  btn: {
    width: 30,
    marginLeft: 10,
    height: 30,
    marginTop: 10,
    color: '#FF0040',
  },
  carrinho: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: 1000,
    background: '',
    borderRadius: 10,
    marginBottom: 100,
    width: '100%',
    position: 'absolute',
  },
  value: {
    marginTop: 7,
    marginLeft: 5,
    color: '#1976d2',
    dispay: 'flex',
    flexDirection: 'row',
  },
  valor: {
    height: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: '#808080',
    fontWeight: 500,
    width: 280,
    fontWeight: 900,
    marginTop: 30,
    position: 'relative'

  },
  image: {
    width: 200,
    height: 200,
    marginLeft: 5,
    marginRight: 100,
    border: 'none'

  },
  produto: {
    height: 300,
    width: '100%',
    marginTop: 100,

    display: 'flex',
    flexDirection: 'row',
    paddingRight: 15,
    borderRadius: 4,

    borderBottom: 'solid 3px #FF0040'

  },
  quantidade: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: 'solid 1px #2272c3',
    borderRadius: 10,
    width: 300,
    height: 100,
    marginTop: 0,
    padding: 20
  },

})

export default estilo;