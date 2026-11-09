/*é a tela das reservas e o componente pai ele guarda a lista reservas 
e qual está sendo editada, ele tbb tem as funções salvar (ele cria ou edita) 
e remover, e guarda tudo no localStorage.*/


import { useState, useEffect } from "react";
import styles from "./Reservas.module.css";
import FormReserva from "../../components/reserva/FormReserva";
import ItemReserva from "../../components/reserva/ItemReserva";

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
  const [reservas, setReservas] = useState(lerReservas);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    localStorage.setItem(CHAVE, JSON.stringify(reservas));
  }, [reservas]);

  const salvar = (dados) => {
    if (editando) {
      setReservas(
        reservas.map((r) => (r.id === editando.id ? { ...r, ...dados } : r))
      );
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
    <section className={styles.pagina}>
      <h1>Reservas</h1>
      <hr />

      <FormReserva
        key={editando ? editando.id : "nova"}
        reservaEditando={editando}
        aoSalvar={salvar}
        aoCancelar={() => setEditando(null)}
      />

      <h2>Reservas feitas</h2>
      {reservas.length === 0 ? (
        <p>Nenhuma reserva ainda.</p>
      ) : (
        <ul className="lista">
          {reservas.map((r) => ( <ItemReserva key={r.id} reserva={r} aoEditar={setEditando} aoRemover={remover}/> ))}
        </ul>
      )}
    </section>
  );
}

export default Reservas;