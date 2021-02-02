import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Usuario } from '../components/Form Login/index';

function PrivateRoute(props) {
  const result = useContext(Usuario);
  const res = result.valid;

  return <div>{res ? <Route {...props} /> : <Redirect to="/" />}</div>;
}

export default PrivateRoute;
