import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Carrinho from "../../components/home_components/carrinho/Carrinho";
import Cardapio from "../../components/home_components/cardapio/Cardapio";
import useTitulo from "../../hooks/useTitulo";

const produtosIniciais = [
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
    desc: "pimenta 🌶️🥵🥵🥵 eh vermelha 🔴",
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
];

const CHAVE_CARDAPIO = "cardapio-negoneys";
const CHAVE_CARRINHO = "carrinho-negoneys";

function lerSalvo(chave, padrao) {
  try {
    const salvo = localStorage.getItem(chave);
    return salvo ? JSON.parse(salvo) : padrao;
  } catch {
    return padrao;
  }
}

function Home() {
  useTitulo("Home");

  const [produtos, setProdutos] = useState(() => lerSalvo(CHAVE_CARDAPIO, produtosIniciais));
  const [compras, setCompras] = useState(() => lerSalvo(CHAVE_CARRINHO, []));

  useEffect(() => {
    localStorage.setItem(CHAVE_CARDAPIO, JSON.stringify(produtos));
  }, [produtos]);

  useEffect(() => {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(compras));
  }, [compras]);

  const adicionar = (produto) => {
    setCompras((atual) => {
      const existente = atual.find((item) => item.id === produto.id);

      if (!existente) {
        return [...atual, { ...produto, quantidade: 1 }];
      }

      if (existente.quantidade >= produto.unidades) {
        return atual;
      }

      return atual.map((item) => item.id === produto.id ? { ...item, quantidade: item.quantidade++ } : item);
    });
  };

  const remover = (id) => {
    setCompras((atual) => atual.filter((item) => item.id !== id));
  };

  const editar = (id, dados) => {
    const novosDados = { ...dados, disponivel: dados.unidades > 0 };

    setProdutos((atual) => atual.map((p) => (p.id === id ? { ...p, ...novosDados } : p)));

    setCompras((atual) =>
      atual
        .map((item) =>
          item.id === id
            ? {...item, ...novosDados, quantidade: Math.min(item.quantidade, novosDados.unidades)}: item,
        )
        .filter((item) => item.quantidade > 0),
    );
  };

  const comprar = () => {
    if (compras.length === 0) return;

    setProdutos((atual) =>
      atual.map((p) => {
        const itemComprado = compras.find((item) => item.id === p.id);
        if (!itemComprado) return p;

        const novasUnidades = Math.max(0, p.unidades - itemComprado.quantidade);
        return { ...p, unidades: novasUnidades, disponivel: novasUnidades > 0 };
      }),
    );

    setCompras([]);
  };

  return (
    <>
      <section className={styles["section-cardapio"]}>
        <h1>Cardápio</h1>
        <hr />
        <ul>
          <Cardapio produtos={produtos} aoAdicionar={adicionar} aoEditar={editar} />
        </ul>
      </section>
      <section className={styles["section-carrinho"]}>
        <h1>Carrinho</h1>
        <hr />
        <ul>
          <Carrinho compras={compras} removendo={remover} aoComprar={comprar} />
        </ul>
      </section>
    </>
  );
}

export default Home;