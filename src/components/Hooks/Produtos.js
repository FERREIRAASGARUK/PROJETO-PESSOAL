import React, { createContext, useState } from 'react';

export const Produtos = createContext();

export const Carrinho = (props) => {
  const [produto, setProduto] = useState([[]]);

  return (
    <Produtos.Provider value={{ produto, setProduto }}>
      {props.children}
    </Produtos.Provider>
  );
};
