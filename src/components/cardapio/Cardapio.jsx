/*o cardapio lista com o .map e key,
cada item mostra nome, descrição, preço e estoque,
com os botões “Adicionar ao Carrinho” e “Editar” e quando edita mostra o FormProduto no lugar*/


import { useState } from "react";
import styles from "./Cardapio.module.css";
import FormProduto from "./FormProduto";

// agora os produtos vêm da Home por props (mudou de lugar)
function Cardapio({ produtos, aoAdicionar, aoEditar }) {
  // Guarda o id do produto que está sendo editado (ou null).
  // eh estado só de interface, por isso fica aqui e não na Home, oukay?
  const [editandoId, setEditandoId] = useState(null);

  return produtos.map((produto) => {
    // se este é o produto em edição, mostra o form no luagr do item.
    if (produto.id === editandoId) {
      return (
        <li key={produto.id} className={styles["prod-disp"]}>
          <FormProduto
            produto={produto}
            aoSalvar={(dados) => {
              aoEditar(produto.id, dados);
              setEditandoId(null); // fecha o form
            }}
            aoCancelar={() => setEditandoId(null)}
          />
        </li>
      );
    }

    // ou caso o contrário, mostra o item normal.
    return (
      <li
        key={produto.id}
        className={
          produto.disponivel ? styles["prod-disp"] : styles["prod-nao-disp"]
        }
      >
        <h2>{produto.nome}</h2>
        <p>{produto.desc}</p>
        <p>
          R${parseFloat(produto.preco).toFixed(2)} - {" "}
          {produto.disponivel ? `${produto.unidades} unidades` : "Esgotado"}
        </p>
        <span>
          <button
            className={styles["botao-adicionar"]}
            onClick={() => aoAdicionar(produto)}
            disabled={!produto.disponivel}
          >
            Adicionar ao Carrinho
          </button>{" "}
          <button
            className={styles["botao-form"]}
            onClick={() => setEditandoId(produto.id)}
          >
            Editar
          </button>
        </span>
      </li>
    );
  });
}

export default Cardapio;