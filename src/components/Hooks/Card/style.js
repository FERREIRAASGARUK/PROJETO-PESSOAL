import { makeStyles } from '@material-ui/styles';

const classe = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
    boxShadow: '0 2px 10px 0 rgba(0,0,0,.80)',
    height: 410,
    borderRadius: 5,
    paddingTop: '10%',
  },

  pai: {
    marginRight: '10%',
    marginTop: '3%',
  },
  image: {
    width: 'auto',
    height: 200,
  },

  title: {
    marginTop: '%',
    fontFamily: 'Arial',
    fontSize: 15,
    fontWeight: 200,
    marginLeft: 20,
    color: '#1976d2',

    height: 100,
  },
  link: {
    textDecoration: 'none',
  },
  preco: {
    color: '#1976d2',
    fontWeight: 1000,
    fontFamily: 'Arial',
    fontSize: 30,
    marginBottom: 15,
  },
  precoPai: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '33%',
    height: 33,
    marginTop: '10%',
    marginLeft: '30%',
    borderRadius: 4,
    color: 'BLACK',
    background: 'white',
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    background: '#01A9DB',
    height: 150,
    position: 'relative',
    boxShadow: '0 2px 13px 0 rgba(0,0,0,.33)',
  },
  h1: {
    color: 'white',
    fontFamily: 'Arial',
    fontSize: 25,
    marginLeft: '3%',
    marginTop: '30%',
  },
  botao2: {
    border: 'solid 4px #ff4040',
    borderRadius: 5,
    background: '#ff4040',
    marginLeft: 20,
    height: 50,
    position: 'relative',
    marginTop: '30%',
  },
  log: {
    width: 50,
    height: 50,
    position: 'relative',
    marginTop: '3%',
  },

  login: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textDecoration: 'none',
  },
});

export default classe;
