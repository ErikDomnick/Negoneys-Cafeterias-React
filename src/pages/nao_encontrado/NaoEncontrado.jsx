import styles from "./NaoEncontrado.module.css";

function naoEncontrado() {
  return (
    <h1 className={styles["deixar-centro"]}>
      404 (Not Found) - Página não encontrada
    </h1>
  );
}

export default naoEncontrado;