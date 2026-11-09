import { useState } from "react";

function FormReserva({ reservaEditando, aoSalvar, aoCancelar }) {
  const [nome, setNome] = useState(reservaEditando ? reservaEditando.nome : "");
  const [data, setData] = useState(reservaEditando ? reservaEditando.data : "");
  const [pessoas, setPessoas] = useState(
    reservaEditando ? reservaEditando.pessoas : 2
  );

  const enviar = (e) => {
    e.preventDefault();
    if (nome.trim() === "") return;

    aoSalvar({ nome: nome.trim(), data, pessoas: Number(pessoas) });

    if (!reservaEditando) {
      setNome("");
      setData("");
      setPessoas(2);
    }
  };

  return (
    <form onSubmit={enviar}>
      <h2>{reservaEditando ? "Editar reserva" : "Nova reserva"}</h2>

      <label>
        Nome
        <br />
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Data
        <br />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Pessoas
        <br />
        <input
          type="number"
          min="1"
          max="20"
          value={pessoas}
          onChange={(e) => setPessoas(e.target.value)}
          required
        />
      </label>
      <br />

      <button type="submit">{reservaEditando ? "Salvar" : "Reservar"}</button>
      {reservaEditando && (
        <button type="button" onClick={aoCancelar}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default FormReserva;