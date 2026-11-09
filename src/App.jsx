/*guarda o cabeçalho do projeto com o menu, rodapé e rotas para o 404, oukay my gazes <3*/


//import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

//import css
import styles from "./App.module.css";

//imports pages
import NaoEncontrado from "./pages/nao_encontrado/NaoEncontrado";
import Home from "./pages/home_page/Home";
import Sobre from "./pages/sobre/Sobre";
import Reservas from "./pages/reservas/Reservas";


function App() {

  return (
    <>
      <BrowserRouter>
        <header>
          <h1>Negoney's Cafeterias</h1>
          <p className={styles["slogan"]}><em>Nossos produtos, seu sorriso</em></p>
          <nav>
            <Link to="/" className={styles["botoes-nav"]}>Home</Link>
            <Link to="/sobre" className={styles["botoes-nav"]}>Sobre</Link>
            <Link to="/reservas" className={styles["botoes-nav"]}>Reservas</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/sobre" element={<Sobre/>}/>
            <Route path="/reservas" element={<Reservas/>}/>
            <Route path="*" element={<NaoEncontrado/>}/>
          </Routes>
        </main>

        <footer>
          <p className={styles["p-copyright"]}>&copy; Negoney's Cafeterias&trade; 2026 - Produzido por Marcos Eduardo & Erik Domnick</p>
        </footer>
      </BrowserRouter>
    </>
  );
};

export default App;