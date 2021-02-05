import { makeStyles } from '@material-ui/styles';

const estilo = makeStyles({
  Container: {
    width: '100%',
    marginTop: '3%',
  },
  Paper1: {
    width: '100%',

    height: 1000,
    display: 'flex',
    flexDirection: 'column',
    padding: '3%',
  },
  grid1: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 0,
    width: '100%',
    paddingBotton: '0%',
    height: 200,
  },
  btn: {
    width: '30%',
  },
  grid11: {
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    height: 333,
    marginTop: '10%',
    color: 'grey'
  },

  grid111: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
  },
  container: {
    height: 600,
    background: 'grey',
    width: '100%',
    display: 'flex',
    flexDirection: 'center',
    justifyContent: 'center'
  },
});

export default estilo;
