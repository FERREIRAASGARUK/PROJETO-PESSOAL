import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

function BotaoLogar() {
  const history = useHistory();

  function Entrar() {
    history.push('/Login');
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      style={{ marginTop: '20%' }}
      onClick={Entrar}
    >
      Entrar
    </Button>
  );
}

export default BotaoLogar;
