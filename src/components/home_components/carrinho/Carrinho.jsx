import styles from "./Carrinho.module.css";

function Carrinho({ compras, removendo, aoComprar }) {
  if (compras.length === 0) {
    return <li className={styles["vazio"]}>Carrinho vazio.</li>;
  }
  const total = compras.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  return (
    <>
      {compras.map((item) => (
        <li key={item.id} className={styles["item"]}>
          <div className={styles["info"]}>
            <span className={styles["nome"]}>{item.nome}</span>
            <span className={styles["detalhe"]}>
              {item.quantidade}x R${item.preco.toFixed(2)}
            </span>
          </div>

          <div className={styles["direita"]}>
            <span className={styles["subtotal"]}>R${(item.preco * item.quantidade).toFixed(2)}</span>
            <button className={styles["botao-remover"]} onClick={() => removendo(item.id)}>
              Remover
            </button>
          </div>
        </li>
      ))}

      <li className={styles["total"]}>
        <span>Total</span>
        <span className={styles["total-valor"]}>R${total.toFixed(2)}</span>
      </li>

      <li className={styles["area-comprar"]}>
        <button className={styles["botao-comprar"]} onClick={aoComprar}>
          Comprar
        </button>
      </li>
    </>
  );
}

export default Carrinho;