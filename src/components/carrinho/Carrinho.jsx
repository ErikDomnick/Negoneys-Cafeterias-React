function Carrinho({ compras, removendo }) {
  if (compras.length === 0) {
    return <li>Carrinho vazio.</li>;
  }

  const total = compras.reduce(
    (soma, item) => soma + item.preco * item.quantidade, 0);

  return (
    <>
      {compras.map((item) => (
        <li key={item.id}>
          {item.nome} - {item.quantidade}x R${item.preco.toFixed(2)}{" "}
          <button onClick={() => removendo(item.id)}>Remover</button>
        </li>
      ))}
      <li>
        <strong>Total: R${total.toFixed(2)}</strong>
      </li>
    </>
  );
}

export default Carrinho;