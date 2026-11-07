function Carrinho({ compras }) {
  return (
    <>
      {compras.map((item, index) => (
        <li key={index}>
          {item.nome} R${item.preco}
        </li>
      ))}
    </>
  );
}

export default Carrinho;
