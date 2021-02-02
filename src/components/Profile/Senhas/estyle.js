import { makeStyles } from '@material-ui/styles';

const estilo = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: '5%',
  },
  btn: {
    width: '30% ',
  },
  input: {
    width: '30%',
    background: 'white',
    color: 'black',
  },
  titulo: {
    fontFamily: 'Arial',
    fontWeight: 200,
  },
});

export default estilo;
