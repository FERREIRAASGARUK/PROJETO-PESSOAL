import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Person from '@material-ui/icons/Person';
import Settings from '@material-ui/icons/Settings';
import Shooping from '@material-ui/icons/ShoppingCartOutlined'
import Lock from '@material-ui/icons/Lock';
import Create from '@material-ui/icons/Create';
import Exit from '@material-ui/icons/ExitToApp';
import { Link, useHistory } from 'react-router-dom';
import estilo from './estilo';
import { Usuario } from '../../Form Login/index';
import Avatar from '@material-ui/core/Avatar'
import { IconButton } from '@material-ui/core';

function Botao(props) {
  let nome;
  const classes = estilo();
  const history = useHistory();
  const palavra = useContext(Usuario);
  const [anchorEl, setAnchorEl] = useState(null);


  palavra.valid ? (nome = props.image) : (nome = 'ENTRAR');

  function clicar(ev) {
    setAnchorEl(ev.currentTarget);
  }
  function fechar() {
    setAnchorEl(null);
  }
  function sair() {
    palavra.setValid(false);
    history.push('/');
  }

  return (
    <div>
      <IconButton onClick={clicar} size='medium'>
        <Avatar

          variant="outlined"
          color="secondary"
          style={{ marginTop: 2, height: 50, width: 50 }}
          src={props.image}
        >

        </Avatar>
      </IconButton>

      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={fechar}
      >
        <Link className={classes.itens} to="/Perfil">
          <MenuItem>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>
        </Link>
        <Link className={classes.itens} to="/Settings">
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Configurações" />
          </MenuItem>
        </Link>
        <Link className={classes.itens} to="/senha">
          <MenuItem>
            <ListItemIcon>
              <Lock fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Senha" />
          </MenuItem>
        </Link>
        <Link className={classes.itens} to="/Criar">
          <MenuItem>
            <ListItemIcon>
              <Create fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Criar" />
          </MenuItem>
        </Link>
        <Link className={classes.itens} onClick={() => sair()}>
          <MenuItem>
            <ListItemIcon>
              <Exit fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

export default Botao;
