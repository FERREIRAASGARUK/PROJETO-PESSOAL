import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { useFormik } from 'formik';
import { TextField, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import estilo from './estyle';
import api from '../../../Services/userServer';
import { Usuario } from '../../Form Login/index';
import  {profileImg} from '../Setings/Settings'

function Senhas() {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const classes = estilo();
  const contexto = React.useContext(Usuario);
  const profile = React.useContext(profileImg)
  const [msg, setMsg] = useState('');
  const [result, setResult] = useState('');
  const [Aberto, setAberto] = useState();
  const vertical = 'top';
  const horizontal = 'left';
  const [retorno, setRetorno] = useState(0)
  const [user,setUser] = useState()


  function abrir() {
    setAberto(true);
  }
  function fechar() {
    setAberto(false);
  }

  const formik = useFormik({
    initialValues: {
      email:'',
      senhaAtual: '',
      senhaNova: '',
      senhaConfirmada: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
      .email(<Typography color="error">Digite um email válido</Typography>) 
      .required(<Typography color="error">este campo precisa ser preenchido</Typography>)
      ,
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
    onSubmit: (values) => {
        let dados;
        let usuarios = [];
        let usuario;

        
         



       async function buscar(){
          dados = await api.get('/users')
          usuarios =  dados.data;

          usuario =  usuarios.filter( e => {
          
            
           return(
           e.email === values.email && e.senha === values.senhaAtual)
         })



        usuario[0] && (usuario[0].senha = values.senhaNova);
       

        usuario[0]  && setUser(usuario[0])
        usuario[0] ? setResult('success'): setResult('error')
        usuario[0]&& setRetorno(retorno)
        usuario[0] ? setMsg('Senha alterada') : setMsg('Email ou senha estão incorretos')
          usuario[0] && localStorage.setItem('login',(JSON.stringify(user)))
        
        async function postar(){
            
         return(await api.put(`/users/${user.id}`,user)  )
         
         
        }
          usuario[0]&& postar()
         
          
       }
        

        buscar()
        
       alert(JSON.stringify(usuario))
       
        }
        

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
          placeholder=" Email"
          variant="outlined"
          label="Email"
          required
          id="text"
          type="email"
          name="email"
          autoFocus
          fullWidth
          margin="normal"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={classes.input}
        />
        {formik.touched.senhaAtual && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <TextField
          placeholder="Senha atual"
          variant="outlined"
          label="Senha Atual"
          required
          id="text"
          type="password"
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
          type="password"
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
