import styles from "./ItemReserva.module.css";

function ItemReserva({ reserva, aoEditar, aoRemover }) {
  const dataBr = reserva.data.split("-").reverse().join("/");
  return (
    <li className={styles["item"]}>
      <div className={styles["info"]}>
        <strong className={styles["nome"]}>{reserva.nome}</strong>
        <span className={styles["detalhe"]}>
          {dataBr} - {reserva.pessoas} {reserva.pessoas === 1 ? "pessoa" : "pessoas"}
        </span>
      </div>

      <div className={styles["botoes"]}>
        <button className={styles["botao"]} onClick={() => aoEditar(reserva)}>
          Editar
        </button>
        <button className={styles["botao"]} onClick={() => aoRemover(reserva.id)}>
          Remover
        </button>
      </div>
    </li>
  );
}

export default ItemReserva;