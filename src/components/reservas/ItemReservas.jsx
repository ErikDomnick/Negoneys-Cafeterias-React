function ItemReserva({ reserva, editando, removendo }) {
  const dataBr = reserva.data.split("-").reverse().join("/");
  return (
    <li>
      <strong>{reserva.nome}</strong> - {dataBr} - {reserva.pessoas}{" "}
      {reserva.pessoas === 1 ? "pessoa" : "pessoas"}
      <br />
      <button onClick={() => editando(reserva)}>Editar</button>{" "}
      <button onClick={() => removendo(reserva.id)}>Remover</button>
    </li>
  );
}

export default ItemReserva;