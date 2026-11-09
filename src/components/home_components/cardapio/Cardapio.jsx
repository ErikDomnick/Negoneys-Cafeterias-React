import { useState, useEffect } from "react";
import styles from "./Cardapio.module.css";
import FormProduto from "./FormProduto";

function Cardapio({ produtos, aoAdicionar, aoEditar }) {
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    if (editandoId === null) return;

    const fecharComEsc = (e) => {
      if (e.key === "Escape") setEditandoId(null);
    };

    window.addEventListener("keydown", fecharComEsc);
    return () => window.removeEventListener("keydown", fecharComEsc);
  }, [editandoId]);

  return produtos.map((produto) => {
    if (produto.id === editandoId) {
      return (
        <li key={produto.id} className={styles["prod-disp"]}>
          <FormProduto
            produto={produto}
            aoSalvar={(dados) => {
              aoEditar(produto.id, dados);
              setEditandoId(null);
            }}
            aoCancelar={() => setEditandoId(null)}
          />
        </li>
      );
    }

    return (
      <li key={produto.id} className={produto.disponivel ? styles["prod-disp"] : styles["prod-nao-disp"]}>
        <h2>{produto.nome}</h2>
        <p>{produto.desc}</p>
        <p>
          R${parseFloat(produto.preco).toFixed(2)} - {produto.disponivel ? `${produto.unidades} unidades` : "Esgotado"}
        </p>
        <span>
          <button className={styles["botao-adicionar"]} onClick={() => aoAdicionar(produto)} disabled={!produto.disponivel}>
            Adicionar ao Carrinho
          </button>{" "}
          <button className={styles["botao-form"]} onClick={() => setEditandoId(produto.id)}>
            Editar
          </button>
        </span>
      </li>
    );
  });
}

export default Cardapio;
