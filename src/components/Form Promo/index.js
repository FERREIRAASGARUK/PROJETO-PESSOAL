import React, { useState, useContext, createContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import {
  AddToHomeScreen,
  AddPhotoAlternate,
  AddShoppingCart,
  Title,
  MonetizationOn,
} from '@material-ui/icons';
import { Button, Snackbar, Container, Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import api from '../../Services/cardServer';
import classe from './style';
import Header from '../Header/header';

const Formulario = () => {
  const classes = classe();

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [Aberto, setAberto] = useState();
  const vertical = 'top';
  const horizontal = 'left';
  const [Msg, setMsg] = useState();
  const [retorno, setRetorno] = useState();

  function abrir() {
    setAberto(true);
  }
  function fechar() {
    setAberto(false);
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      price: '',
      imageUrl: '',
      url: '',
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .min(
          10,
        <Typography color="error">digite no mínimo 10 caractéres</Typography>
        )
        .max(
          200,
        <Typography color="error">digite no máximo 50 caractéres</Typography>
        )
        .required(
          <Typography color="error">Este campo não pode ficar vazio</Typography>
        ),

      price: Yup.string().required(
        <Typography color="error">Este campo não pode estar vazio</Typography>
      ),

      imageUrl: Yup.string()
        .url(<Typography color="error">Use um link válido</Typography>)
        .required(
          <Typography color="error">Este campo não pode estar vazio</Typography>
        ),

      url: Yup.string()
        .required(
          <Typography color="error">Este campo não pode estar vazio</Typography>
        )
        .url(<Typography color="error">Use um link válido</Typography>),
    }),

    onSubmit: async (values) => {
      const dataStr = localStorage.getItem('login');
      const data = JSON.parse(dataStr);
      let email;
      email = data.email;

      let msg;
      let ret;
      const datas = await api.get('/promotions');
      const promo = datas.data;
      const prod = promo.filter((e) => e.imageUrl === values.imageUrl);

      async function verificar() {
        if (prod.length === 0) {
          await api.post('/promotions', { ...values, usuario: email });
          msg = 'Produto cadastrado';
          ret = 'success';
        } else {
          msg = 'Produto já cadastrado use outra imagem!';
          ret = 'error';
        }
        setMsg(msg);
        setRetorno(ret);
      }

      verificar();
    },
  });

  return (
    <div>
      <Header />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={Aberto}
        onClose={fechar}
        autoHideDuration={5000}
      >
        <Alert severity={retorno}>
          <div>{Msg}</div>
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Avatar className={classes.imagem}>
            <AddShoppingCart />
          </Avatar>
          <h1 className={classes.title}>CADASTRE SEUS PRODUTOS</h1>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <TextField
              placeholder="Título ou descrição "
              variant="outlined"
              label="Descrição/title"
              required
              id="title"
              type="text"
              name="title"
              autoFocus
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment className={classes.adorno}>
                    <Title />
                  </InputAdornment>
                ),
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className={classes.input}
            />

            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
            <div className={classes.input} />

            <TextField
              placeholder="Digite o preço do produto"
              variant="outlined"
              label="preço"
              required
              id="price"
              type="number"
              name="price"
              fullWidth
              autoFocus
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment className={classes.adorno}>
                    <MonetizationOn />
                  </InputAdornment>
                ),
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className={classes.input}
            />

            {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null}

            <div className={classes.input} />

            <TextField
              placeholder="coloque o link da imageUrl"
              variant="outlined"
              label="imageUrl"
              required
              id="url"
              type="url"
              name="imageUrl"
              fullWidth
              autoFocus
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment className={classes.adorno}>
                    <AddPhotoAlternate />
                  </InputAdornment>
                ),
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.imageUrl}
              className={classes.input}
            />
            {formik.touched.imageUrl && formik.errors.imageUrl ? (
              <div>{formik.errors.imageUrl}</div>
            ) : null}

            <div className={classes.input} />

            <TextField
              placeholder="Digite/cole o link do site "
              variant="outlined"
              label="Url"
              required
              id="Url"
              type="url"
              name="url"
              fullWidth
              autoFocus
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment className={classes.adorno}>
                    <AddToHomeScreen />
                  </InputAdornment>
                ),
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.url}
              className={classes.input}
            />

            {formik.touched.url && formik.errors.url ? (
              <div>{formik.errors.url}</div>
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
              Salvar
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Formulario;
