import React, { useState, useContext, createContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Button, Snackbar, Container, Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import api from '../../Services/userServer';
import classe from './style';


export const Usuario = createContext();

export const Validar = (props) => {
  const [valid, setValid] = useState(false);

  return (
    <Usuario.Provider value={{ valid, setValid }}>
      {props.children}
    </Usuario.Provider>
  );
};

const Login = () => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const contexto = useContext(Usuario);
  const history = useHistory();
  const [msg, setMsg] = useState('');
  const [result, setResult] = useState('');
  const [Aberto, setAberto] = useState();
  const vertical = 'top';
  const horizontal = 'left';
  const classes = classe();

  function abrir() {
    setAberto(true);
  }
  function fechar() {
    setAberto(false);
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      senha: '',
    },

    validationSchema: Yup.object({
      senha: Yup.string()
        .min(
          8,
          <Typography color="error">digite no mínimo 8 caractéres</Typography>
        )
        .required(
          <Typography color="error">Este campo não pode ficar vazio</Typography>
        ),

      email: Yup.string()
        .email(
          <Typography color="error">Endereço de email inválido</Typography>
        )
        .required(
          <Typography color="error">Este campo não pode estar vazio</Typography>
        ),
    }),

    onSubmit: async (values) => {
      let retorno;
      let mensagem;
      let validar;
      let id;
      const response = await api.get('http://localhost:3002/users');
      const resposta = response.data;
      const result = resposta.filter(
        (e) => e.email === values.email && e.senha === values.senha
      );
      result[0] ? (retorno = 'success') : (retorno = 'error');
      retorno === 'success' ? (mensagem = 'Login realizadao') : (mensagem = 'Usuário ou senha incorreta');
      retorno === 'success' && (validar = result[0]);
      retorno === 'success' && history.push('/');
      result[0] && localStorage.setItem('login', JSON.stringify(result[0]));
      contexto.setValid(validar);
      setMsg(mensagem);
      setResult(retorno);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
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
        <Avatar className={classes.imagem}>
          <LockOutlinedIcon />
        </Avatar>
        <h1 className={classes.title}>Acesse sua conta</h1>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <TextField
            placeholder="Digitte seu email "
            variant="outlined"
            label="Usuário"
            required
            id="text"
            type="email"
            name="email"
            autoFocus
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment className={classes.adorno}>
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={classes.input}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          <div className={classes.input} />

          <TextField
            placeholder="Utilize letras, números e símbolos"
            variant="outlined"
            label="Senha"
            required
            id="senha"
            type="password"
            name="senha"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.senha}
            fullWidth
            autoFocus
            margin="normal"
          />
          {formik.touched.senha && formik.errors.senha ? (
            <div>{formik.errors.senha}</div>
          ) : null}
          <div className={classes.input} />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.btn}
            onClick={() => abrir(true)}
          >
            Acesse sua conta
          </Button>

          <Grid container>
            <Grid item xs>
              <Link
                style={{ textDecoration: 'none', color: '#0000FF' }}
                to="/senha"
              >
                Esqueceu sua senha?
              </Link>
            </Grid>
            <Grid item>
              <Link
                style={{ textDecoration: 'none', color: '#0000FF' }}
                to="/Register"
              >
                {' '}
                Não tem uma conta? crie uma
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
