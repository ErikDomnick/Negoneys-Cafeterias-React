import { useState } from "react";
import styles from "./Home.module.css";
import Carrinho from "../../components/carrinho/Carrinho";
import Cardapio from "../../components/cardapio/Cardapio";

function Home() {
  const [compras, setCompras] = useState([]);

  const adicionar = (produto) => {
    setCompras([...compras, produto]);
  };

  return (
    <span>
      <section className={styles["section-cardapio"]}>
        <h1>Cardápio</h1>
        <hr />
        <ul>
          <Cardapio aoAdicionar={adicionar} />
        </ul>
      </section>
      <section className={styles["section-carrinho"]}>
        <h1 className={styles.marginzinho}>Carrinho</h1>
        <hr />
        <ul>
          <Carrinho compras={compras} />
        </ul>
      </section>
    </span>
  );
}

export default Home;
