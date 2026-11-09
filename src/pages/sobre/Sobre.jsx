import styles from "./Sobre.module.css";
import useTitulo from "../../hooks/useTitulo";

function Sobre() {
  useTitulo("Sobre");

  return (
    <div className={styles["container-sobre"]}>
      <section className={styles["section-sobre"]}>
        <h1>Sobre Nós</h1>
        <hr />
        <article className={styles["textos"]}>
          <h2>Quem Somos</h2>
          <p>A nossa cafeteria abriu no dia primeiro de setembro, somos novos nesse ramo alimentício. Nosso objetivo é lucrar e poder criar novas categorias no ramo das cafeterias. Ainda não possuímos todo o alcance que desejamos, mas nós cremos que chegaremos aos nossos objetivos.</p>

          <h2>Nossos Produtos</h2>
          <p>Nossos produtos são fornecidos pelo Atacadão do Ponto Supermercados, eles nos são vendidos uma vez por semana.</p>

          <h2>Onde estamos</h2>
          <p>Estamos localizados na Avenida Relampago Marquinhos, 423, centro - Estamos abertos de Segunda-feira a Sábado - 8:00 horas até as 18:00</p>
        </article>
      </section>

      {/* arquivos da pasta public são chamados direto pela "/", sem import */}
      <img className={styles["foto"]} src="/mr_negoney.png" alt="Mr. Negoney xique" />
    </div>
  );
}

export default Sobre;
