/*import { useState } from "react";
import styles from "./Cardapio.module.css";

function Cardapio({ aoAdicionar, aoEditar}) {
  const [produtos] = useState([
    {
      id: 1,
      nome: "Hamburgao",
      desc: "pao intreartesanal, com gergelim do imperio otomano, hamburguer na chapa frito assado 184.436g, alface e tomate, queijo gorgonzola e só o básico 👍",
      preco: 19.99,
      unidades: 12,
      disponivel: true,
    },
    {
      id: 2,
      nome: "Chicletinho",
      desc: "chiclete de morango melancia mamao jabuticaba maçã laranja tomate ervilha milho carne de gado ultra industrializado, RECOMEDAÇÃO DA FABRICANTE: ☢️ Não consumir ☢️",
      preco: 3.99,
      unidades: 0,
      disponivel: false,
    },
    {
      id: 3,
      nome: "Pimenta",
      desc: "pimenta 🌶️ vremelha 🔴",
      preco: 4.99,
      unidades: 9,
      disponivel: true,
    },
    {
      id: 4,
      nome: "Pitça",
      desc: "pitça de calabreso com oregano, queijo, molho de tomate e pasta termica",
      preco: 14.99,
      unidades: 53,
      disponivel: true,
    },
    {
      id: 5,
      nome: "Pastelinho",
      desc: "pastel de pastel com pastel de frango e pastel de repolho",
      preco: 1.99,
      unidades: 0,
      disponivel: false,
    },
    {
      id: 6,
      nome: "Cafézão",
      desc: "café feito pelo negoney no imalaia, com lagrimas de unicornio e uma colher de açucar",
      preco: 9999.99,
      unidades: 1,
      disponivel: true,
    },
  ]);
  
  return produtos.map((produto) => (
    <li key={produto.id} className={produto.disponivel ? styles["prod-disp"] : styles["prod-nao-disp"]}>
      <h2>{produto.nome}</h2>
      <p>{produto.desc}</p>
      <p>R${parseFloat(produto.preco).toFixed(2)} - {" "} {produto.disponivel ? `${produto.unidades} unidades` : "Esgotado"}</p>
      <button className={styles["botao-adicionar"]} onClick={() => aoAdicionar(produto)} disabled={!produto.disponivel}>Adicionar ao Carrinho</button>
      <button onClick={() => aoEditar(produto)}>Editar</button>
    </li>
  ));
}

export default Cardapio;*/

import { useState } from "react";
import styles from "./Cardapio.module.css";
import FormProduto from "./FormProduto";

// Agora os produtos vêm da Home por props (não ficam mais aqui dentro).
function Cardapio({ produtos, aoAdicionar, aoEditar }) {
  // Guarda o id do produto que está sendo editado (ou null).
  // É estado só de interface, por isso fica aqui e não na Home.
  const [editandoId, setEditandoId] = useState(null);

  return produtos.map((produto) => {
    // Se este é o produto em edição, mostra o form NO LUGAR do item.
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

    // Caso contrário, mostra o item normal.
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