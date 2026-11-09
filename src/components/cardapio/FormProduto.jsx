import { useState } from "react";
import styles from "./Cardapio.module.css";

// Formulário de edição de um produto do cardápio.
// Os campos já começam preenchidos com os valores do produto.
function FormProduto({ produto, aoSalvar, aoCancelar }) {
  // Inputs trabalham com texto, por isso preco/unidades viram String aqui.
  const [nome, setNome] = useState(produto.nome);
  const [desc, setDesc] = useState(produto.desc);
  const [preco, setPreco] = useState(String(produto.preco));
  const [unidades, setUnidades] = useState(String(produto.unidades));
  const [erro, setErro] = useState("");

  const enviar = (e) => {
    e.preventDefault();

    // 1) Todos os campos preenchidos?
    if (
      nome.trim() === "" ||
      desc.trim() === "" ||
      preco.trim() === "" ||
      unidades.trim() === ""
    ) {
      setErro("Preencha todos os campos antes de terminar.");
      return;
    }

    // 2) Números válidos?
    const precoNum = Number(preco);
    const unidadesNum = Number(unidades);

    if (Number.isNaN(precoNum) || precoNum < 0) {
      setErro("O preço deve ser um número maior ou igual a zero.");
      return;
    }

    if (!Number.isInteger(unidadesNum) || unidadesNum < 0) {
      setErro("As unidades devem ser um número inteiro maior ou igual a zero.");
      return;
    }

    setErro("");
    aoSalvar({
      nome: nome.trim(),
      desc: desc.trim(),
      preco: precoNum,
      unidades: unidadesNum,
    });
  };

  return (
    // noValidate: desliga as mensagens automáticas do navegador
    // para que apareça a nossa mensagem de erro abaixo do form.
    <form onSubmit={enviar} noValidate className={styles["form-produto"]}>
      <label>
        Nome
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </label>

      <label>
        Descrição
        <textarea
          rows="3"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </label>

      <label>
        Preço (R$)
        <input
          type="number"
          min="0"
          step="0.01"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
      </label>

      <label>
        Unidades em estoque
        <input
          type="number"
          min="0"
          step="1"
          value={unidades}
          onChange={(e) => setUnidades(e.target.value)}
        />
      </label>

      <div className={styles["botoes-form"]}>
        <button type="submit" className={styles["botao-form"]}>
          Terminar
        </button>
        <button
          type="button"
          className={styles["botao-form"]}
          onClick={aoCancelar}
        >
          Cancelar
        </button>
      </div>

      {erro && (
        <p className={styles["erro"]} role="alert">
          {erro}
        </p>)}
    </form>
  );
}

export default FormProduto;
