import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import api from '../../Services/userServer';
import estillo from './style';

const Formulario = () => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const history = useHistory();
  const [message, setMessage] = useState();
  const [retorno, setRetorno] = useState();
  const [Open, setOpen] = useState();
  const vertical = 'top';
  const horizontal = 'left';
  let mensagem;
  let result;

  function mudar() {
    setOpen(true);
  }
  function fechar() {
    setOpen(false);
  }

  const estilo = estillo();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      senha: '',
      Contato: '',
    },

    validationSchema: yup.object({
      firstName: yup.string().required(
        <Typography variant="subtitle2" color="error">
          Este campo precisa ser preenchido
        </Typography>
      ),
      lastName: yup
        .string()
        .required(
          <Typography color="error">
            Este campo precisa ser preenchido
          </Typography>
        ),
      email: yup
        .string()
        .email(<Typography color="error">Digite um email válido</Typography>)
        .required(
          <Typography color="error">
            Este campo precisa ser preenchido
          </Typography>
        ),
      senha: yup
        .string()
        .required(
          <Typography color="error">
            Este campo precisa ser preenchido
          </Typography>
        )
        .min(
          8,
        <Typography color="error">Digite no minimo 8 dígitos</Typography>
        ),
    }),

    onSubmit: async (values) => {
      const dados = await api.get('/users');
      const usuarios = dados.data;

      async function postar() {
        return await api.post('/users', values);
      }

      const resposta = usuarios.filter((e) => e.email === values.email);

      resposta[0] ? (result = 'error') : (result = 'success');
      result === 'success'
        ? postar() && history.push('/')
        : result === 'error'
        ? (mensagem = 'usuário já cadastrado, faça login')
        : (mensagem = 'cadastro realizado');

      setMessage(mensagem);
      setRetorno(result);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={estilo.paper}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={3000}
          onClose={fechar}
          open={Open}
        >
          <Alert severity={retorno}>
            <div>{message}</div>
          </Alert>
        </Snackbar>
        <Avatar style={{ marginTop: '5%', background: '#338DFF' }}>
          <LockOutlinedIcon />
        </Avatar>
        <h1 style={{ color: 'black', fontFamily: 'Arial', margin: '10%' }}>
          Faça seu cadastro
        </h1>

        <form onSubmit={formik.handleSubmit} className={estilo.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                id="firstName"
                label="Primeiro Nome"
                name="firstName"
                placeholder="Primeiro Nome"
                fullWidth
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                id="Segundo Nome"
                label="Segundo Nome"
                name="lastName"
                placeholder="Segundo Nome"
                fullWidth
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div>{formik.errors.lastName}</div>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                id="contato"
                label="Contato"
                name="Contato"
                placeholder="Contato"
                fullWidth
                value={formik.values.Contato}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                id="email"
                label="Email"
                name="email"
                placeholder="email"
                fullWidth
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                id="Senha"
                label="Senha"
                name="senha"
                placeholder="senha"
                fullWidth
                value={formik.values.senha}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.senha && formik.errors.senha ? (
                <div>{formik.errors.senha}</div>
              ) : null}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={estilo.btn}
            style={{ marginTop: '10%', marginBottom: '5%' }}
            onClick={() => mudar()}
          >
            Salvar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                style={{ textDecoration: 'none', color: '#0000FF' }}
                to="/Login"
              >
                Já tem uma conta? Entre{' '}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Formulario;
