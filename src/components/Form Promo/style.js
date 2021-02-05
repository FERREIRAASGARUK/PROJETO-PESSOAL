import { makeStyles } from '@material-ui/styles';

const classe = makeStyles({
  paper: {
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 'solid 1px grey',
    borderRadius: 8,
    padding: '3%',
    width: '100%',
    marginBottom: '20%',
  },

  imagem: {
    background: 'white',
    margin: '2%',
    marginTop: '3%',
    marginBottom: '1%',
  },

  form: {
    width: '100%',
    marginTop: '5%',
    marginLeft: '10',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  adorno: {
    marginLeft: '1%',
    width: 30,
  },

  botao: {
    margin: '10%',
  },
  input: {
    marginTop: '3%',
    width: '70%',
    marginLeft: '10',
  },
  title: {
    fontFamily: 'Arial',
    color: "black "
  },
});

export default classe;
