import { useState } from "react";
import styles from "./Cardapio.module.css";

function Cardapio({ aoAdicionar }) {
  const [produtos] = useState([
    {
      id: 1,
      nome: "Hamburgao",
      desc: "",
      preco: 19.99,
      unidades: 12,
      disponivel: true,
    },
    {
      id: 2,
      nome: "Chicletinho",
      desc: "",
      preco: 3.99,
      unidades: 0,
      disponivel: false,
    },
    {
      id: 3,
      nome: "Pimenta",
      desc: "",
      preco: 4.99,
      unidades: 9,
      disponivel: true,
    },
    {
      id: 4,
      nome: "Pitça",
      desc: "",
      preco: 14.99,
      unidades: 53,
      disponivel: true,
    },
    {
      id: 5,
      nome: "Pastelinho",
      desc: "",
      preco: 1.99,
      unidades: 0,
      disponivel: false,
    },
    {
      id: 6,
      nome: "Cafézão",
      desc: "",
      preco: 59.99,
      unidades: 1,
      disponivel: true,
    },
  ]);

  //const [ordemConc, setOrdemConc] = useState(concluida);

  return produtos.map((produto) => (
    <li
      key={produto.id}
      className={
        produto.disponivel ? styles["prod-disp"] : styles["prod-nao-disp"]
      }
    >
      <h2>{produto.nome}</h2>
      <p>{produto.desc}</p>
      <p>
        R${parseFloat(produto.preco).toFixed(2)} -{" "}
        {produto.disponivel ? `${produto.unidades} unidades` : "Esgotado"}
      </p>
      <button
        onClick={() => aoAdicionar(produto)}
        disabled={!produto.disponivel}
      >
        Adicionar ao Carrinho
      </button>
    </li>
  ));
}

export default Cardapio;