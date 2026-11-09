import { useState, useEffect, useRef } from "react";
import styles from "./FormReserva.module.css";

function FormReserva({ reservaEditando, aoSalvar, aoCancelar }) {
  const [nome, setNome] = useState(reservaEditando ? reservaEditando.nome : "");
  const [data, setData] = useState(reservaEditando ? reservaEditando.data : "");
  const [pessoas, setPessoas] = useState(reservaEditando ? reservaEditando.pessoas : "");

  const nomeRef = useRef(null);

  useEffect(() => {
    if (reservaEditando) nomeRef.current.focus();
  }, [reservaEditando]);

  const enviar = (e) => {
    e.preventDefault();
    if (nome.trim() === "") return;

    aoSalvar({ nome: nome.trim(), data, pessoas: Number(pessoas) });

    if (!reservaEditando) {
      setNome("");
      setData("");
      setPessoas("");
    }
  };

  return (
    <form className={styles["form-reserva"]} onSubmit={enviar}>
      <h2>{reservaEditando ? "Editar reserva" : "Nova reserva"}</h2>

      <label>
        Nome
        <br />
        <input ref={nomeRef} type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </label>
      <br />

      <label>
        Data
        <br />
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
      </label>
      <br />

      <label>
        Pessoas
        <br />
        <input type="number" min="1" max="20" value={pessoas} onChange={(e) => setPessoas(e.target.value)} required />
      </label>
      <br />

      <div className={styles["botoes-form"]}>
        <button type="submit" className={styles["botao-form"]}>
          {reservaEditando ? "Salvar" : "Reservar"}
        </button>
        {reservaEditando && (
          <button type="button" className={styles["botao-form"]} onClick={aoCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default FormReserva;