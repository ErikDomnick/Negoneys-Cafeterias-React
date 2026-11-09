/*eh a "cabeça" da tela piá, guarda so estados e 
tem as funções add, remover e editar do projeto. 
Além de tudo passo para o carrinho em formjato de props*/


import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Carrinho from "../../components/carrinho/Carrinho";
import Cardapio from "../../components/cardapio/Cardapio";

// A lista que antes ficava dentro do Cardapio foi jogada pra cá, agora ela ta aq
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

// nomes que os dados ficam guardados no navegador (localStorage) guys
const CHAVE_PRODUTOS = "produtos-negoneys";
const CHAVE_COMPRAS = "compras-negoneys";

// Lê um dado salvo no navegador. se não tiver nada (ou estiver estragado), ele devolve o valor padrão (valor podrão)
function lerSalvo(chave, padrao) {
  try {
    const salvo = localStorage.getItem(chave);
    return salvo ? JSON.parse(salvo) : padrao;
  } catch {
    return padrao;
  }
}

function Home() {
  const [produtos, setProdutos] = useState(() =>
    lerSalvo(CHAVE_PRODUTOS, produtosIniciais)
  );
  const [compras, setCompras] = useState(() => lerSalvo(CHAVE_COMPRAS, []));

  // sempre que os produtos mudarem, ele guarda no navegador
  useEffect(() => {
    localStorage.setItem(CHAVE_PRODUTOS, JSON.stringify(produtos));
  }, [produtos]);

  // sempre que o carrinho mudar, ele guarda no navegador
  useEffect(() => {
    localStorage.setItem(CHAVE_COMPRAS, JSON.stringify(compras));
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

  // UPDATE: troca só o produto com esse id pelos dados novos
  const editar = (id, dados) => {
    // "disponivel" é derivado do estoque, assim nunca fica inconsistente
    const novosDados = { ...dados, disponivel: dados.unidades > 0 };

    setProdutos((atual) =>
      atual.map((p) => (p.id === id ? { ...p, ...novosDados } : p))
    );

    /* O carrinho guarda uma cópia do produto, então precisa ser atualizado:
     novo nome ou preço, quantidade limitada ao novo estoque, e remove o item se o estoque zerou.*/
    setCompras((atual) =>
      atual
        .map((item) =>
          item.id === id
            ? {
                ...item,
                ...novosDados,
                quantidade: Math.min(item.quantidade, novosDados.unidades),
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  return (
    <>
      <section className={styles["section-cardapio"]}>
        <h1>Cardápio</h1>
        <hr />
        <ul>
          <Cardapio
            produtos={produtos}
            aoAdicionar={adicionar}
            aoEditar={editar}
          />
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