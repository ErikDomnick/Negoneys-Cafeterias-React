import { useState, useEffect } from "react";
import styles from "./Reservas.module.css";
import FormReserva from "../../components/reservas_components/form_reserva/FormReserva";
import ItemReserva from "../../components/reservas_components/item_reserva/ItemReserva";
import useTitulo from "../../hooks/useTitulo";

const CHAVE = "reservas-negoneys";

function lerReservas() {
  try {
    const salvo = localStorage.getItem(CHAVE);
    return salvo ? JSON.parse(salvo) : [];
  } catch {
    return [];
  }
}

function Reservas() {
  useTitulo("Reservas");

  const [reservas, setReservas] = useState(lerReservas);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    localStorage.setItem(CHAVE, JSON.stringify(reservas));
  }, [reservas]);

  useEffect(() => {
    if (editando) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [editando]);

  const salvar = (dados) => {
    if (editando) {
      setReservas(reservas.map((r) => (r.id === editando.id ? { ...r, ...dados } : r)));
      setEditando(null);
    } else {
      setReservas([...reservas, { id: Date.now(), ...dados }]);
    }
  };

  const remover = (id) => {
    setReservas(reservas.filter((r) => r.id !== id));
    if (editando && editando.id === id) setEditando(null);
  };

  return (
    <>
      <section className={styles["section-reservar"]}>
        <h1>Reservar</h1>
        <hr />
        <FormReserva key={editando ? editando.id : "nova"} reservaEditando={editando} aoSalvar={salvar} aoCancelar={() => setEditando(null)} />
      </section>

      <section className={styles["section-reservas"]}>
        <h1>Reservas</h1>
        <hr />
        {reservas.length === 0 ? (
          <p className={styles["vazio"]}>Nenhuma reserva ainda.</p>
        ) : (
          <ul className={styles["lista"]}>
            {reservas.map((r) => (
              <ItemReserva key={r.id} reserva={r} aoEditar={setEditando} aoRemover={remover} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default Reservas;
