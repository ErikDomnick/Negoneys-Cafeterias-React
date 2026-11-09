/*mostra uma reserva, nome e data no formato dia/mes/ano, pessoa ou pessoas piá e os botões editar e remover.*/


function ItemReserva({ reserva, aoEditar, aoRemover }) {
  //split eh a tesoura, ele corta onde tiver o "-", exemplo a questão da data 2026-11-09
  //o reverse ele vai inverter, ent vai ficar 09 11 e 2026
  // o join serve como uma cola aq, ele pega os valores que forma cortados e invertidos e junta td e coloca uma / na divisão, ou seja fica assim: 09/11/2026
  const dataBr = reserva.data.split("-").reverse().join("/");
  return (
    <li>
      <strong>{reserva.nome}</strong> - {dataBr} - {reserva.pessoas}{" "}
      {reserva.pessoas === 1 ? "pessoa" : "pessoas"}
      <br />
      <button onClick={() => aoEditar(reserva)}>Editar</button>{" "}
      <button onClick={() => aoRemover(reserva.id)}>Remover</button>
    </li>
  );
}

export default ItemReserva;