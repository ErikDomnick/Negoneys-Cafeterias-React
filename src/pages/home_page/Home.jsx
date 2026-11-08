import { useState } from "react";
import styles from "./Home.module.css";
import Carrinho from "../../components/carrinho/Carrinho";
import Cardapio from "../../components/cardapio/Cardapio";

function Home() {
  const [compras, setCompras] = useState([]);
  const adicionar = (produto) => {
    setCompras((atual) => {
      const existente = atual.find((item) => item.id === produto.id);

      if (!existente) {
        return [...atual, { ...produto, quantidade: 1 }];
      }
      if (existente.quantidade >= produto.unidades) {
        return atual;
      }
      return atual.map((item) =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
    });
  };

  const remover = (id) => {
    setCompras((atual) => atual.filter((item) => item.id !== id));
  };

  return (
    <>
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
          <Carrinho compras={compras} removendo={remover} />
        </ul>
      </section>
    </>
  );
}

export default Home;