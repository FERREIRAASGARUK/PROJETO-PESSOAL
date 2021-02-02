import * as Yup from 'yup';
import React, { useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { useFormik } from 'formik';
import { TextField, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import estilo from './estyle';
import api from '../../../Services/userServer';
import { Usuario } from '../../Form Login/index';

function Senhas() {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const classes = estilo();
  const contexto = React.useContext(Usuario);
  const [msg, setMsg] = useState('');
  const [result, setResult] = useState('');
  const [Aberto, setAberto] = useState();
  const vertical = 'top';
  const horizontal = 'left';

  function abrir() {
    setAberto(true);
  }
  function fechar() {
    setAberto(false);
  }

  const formik = useFormik({
    initialValues: {
      senhaAtual: '',
      senhaNova: '',
      senhaConfirmada: '',
    },

    validationSchema: Yup.object({
      senhaAtual: Yup.string()
        .min(
          8,
        <Typography color="error">digite no mínimo 8 caractéres</Typography>
        )
        .required(
          <Typography color="error">Este campo não pode ficar vazio</Typography>
        ),

      senhaNova: Yup.string()
        .min(
          8,
        <Typography color="error">digite no mínimo 8 caractéres</Typography>
        )
        .required(
          <Typography color="error">Este campo não pode estar vazio</Typography>
        ),

      senhaConfirmada: Yup.string()
        .min(
          8,
        <Typography color="error">Este campo não pode estar vazio</Typography>
        )
        .oneOf(
          [Yup.ref('senhaNova'), null],
          <Typography color="error">As senhas precisam ser iguais</Typography>
        ),
    }),
    onSubmit: async (values) => {
      const id = localStorage.getItem('login');
      const Id = JSON.parse(id);
      const response = await api.get(`http://localhost:3002/users/${Id.id}`);
      const resposta = response.data;
      let retorno;
      let mensagem;

      /// /FAZER ATUALIZAÇÃO DE SENHA NO DB USERS E NO LOCALSTORAGE

      resposta.senha === values.senhaAtual
      && values.senhaAtual === resposta.senhaConfirmada
        ? (mensagem = 'Senha atualizada')
        : (mensagem = 'A senha atual está incorreta');
      resposta.senha === values.senhaAtual
      && values.senhaAtual === resposta.senhaConfirmada
        ? (retorno = 'success')
        : (retorno = 'error');
      setMsg(mensagem);
      setResult(retorno);

      resposta.senha === values.senhaAtual
        && (resposta.senha = values.senhaNova);
      alert(JSON.stringify(resposta));
      async function trocar() {
        await api.post('http://localhost:3002/users', resposta);
      }

      resposta.senha === values.senhaAtual && trocar();
    },

    // // resposta.email === values.email && alert('teste')
    // alert(JSON.stringify(resposta))
  });

  return (
    <div className={classes.root}>
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
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <h1 className={classes.titulo}>TROQUE SUA SENHA</h1>
        <TextField
          placeholder="Senha atual"
          variant="outlined"
          label="Senha Atual"
          required
          id="text"
          type="text"
          name="senhaAtual"
          autoFocus
          fullWidth
          margin="normal"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.senhaAtual}
          className={classes.input}
        />
        {formik.touched.senhaAtual && formik.errors.senhaAtual ? (
          <div>{formik.errors.senhaAtual}</div>
        ) : null}

        <TextField
          placeholder="Nova senha "
          variant="outlined"
          label="Nova senha"
          required
          id="text"
          type="text"
          name="senhaNova"
          autoFocus
          fullWidth
          margin="normal"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.senhaNova}
          className={classes.input}
        />
        {formik.touched.senhaNova && formik.errors.senhaNova ? (
          <div>{formik.errors.senhaNova}</div>
        ) : null}

        <TextField
          placeholder="Repita sua senha"
          variant="outlined"
          label="Senha"
          type="password"
          name="senhaConfirmada"
          autoFocus
          fullWidth
          margin="normal"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.senhaConfirmada}
          className={classes.input}
        />
        {formik.touched.senhaConfirmada && formik.errors.senhaConfirmada ? (
          <div>{formik.errors.senhaConfirmada}</div>
        ) : null}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={() => abrir(true)}
        >
          REDEFINIR
        </Button>
      </form>
    </div>
  );
}

export default Senhas;
