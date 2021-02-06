import React, { useState, createContext, useContext } from 'react';
import Header from '../../Header/header';
import estilo from './estyle.js';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/LinkOutlined';
import api from '../../../Services/userServer'
import MuiAlert from '@material-ui/lab/Alert';
import { Button, Snackbar, Avatar } from '@material-ui/core';

export const profileImg = createContext()


export const Profile = (props) => {

    const profile = (JSON.parse(localStorage.getItem('login')))
    const imageProfile = profile.image

    const [image, setImage] = useState(imageProfile)

    return (
        <profileImg.Provider
            value={{ image, setImage }}
        >
            {props.children}
        </profileImg.Provider>
    )
}



const Settings = () => {
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const imagem = useContext(profileImg)
    const classes = estilo()
    const [account, setAccount] = useState()
    const [msg, setMsg] = useState()
    const [retorno, setRetorno] = useState()
    const vertical = 'top';
    const horizontal = 'left';
    const [Aberto, setAberto] = useState();

    function abrir() {
        setAberto(true);
    }
    function fechar() {
        setAberto(false);
    }
    const [values, setValues] = useState({
        Email: '',
        Profile: ''
    })
    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setValues({ ...values, [name]: value })
    }
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        imagem.setImage(values.Profile)
        //BUSCANDO DADOS DO USUÁRIO NON CACHE

        const user = (JSON.parse(localStorage.getItem('login')))
        const userId = user.id
        user.image = values.Profile


        //BUSCANDO DADOS DO USUÁRIO NO 'BANCO DE DADOS'
        async function buscarUser() {
            const response = await api.get(`/users`)
            const resposta = response.data;
            const usuario = resposta.filter(e => {
                return (e.email === values.Email)
            })
            usuario[0] ? setAccount(true) : setAccount(false)
            usuario[0] ? setMsg('Já existe uma conta cadastrada com este email , digite um email novo') : setMsg('Imagem atualizada')
            usuario[0] ? setRetorno('error') : setRetorno('success')
            usuario[0] && localStorage.setItem('login', (JSON.stringify(user)))
            console.log(usuario[0].firstName)
        }
        buscarUser()
        abrir()
        account === false && await api.put(`/users/${userId}`, user)
        console.log(imagem.image)
    }
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
                    <div>{msg}</div>
                </Alert>
            </Snackbar>
            <div className={classes.main}>
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <Avatar className={classes.profileImg} src={imagem.image} />
                </IconButton>
            </div>
            <div className={classes.content}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        className={classes.imageLink}
                        id="image"
                        label="Imagem de perfil"
                        name='Profile'
                        placeholder='cole aqui o link da sua imagem'
                        variant='outlined'
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button className={classes.btn} variant='outlined' color='primary' type='submit' >
                        Atualizar
                    </Button>
                </form>
            </div>
        </div>
    )
};

export default Settings;
