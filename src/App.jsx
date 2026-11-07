//import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
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
          <p id="frase-motivacional-do-negoneyson"><em>Nossos produtos, seu sorriso</em></p>
          <nav>
            <Link to="/" className="btnnav">Home</Link>
            <Link to="/sobre" className="btnnav">Sobre</Link>
            <Link to="/reservas" className="btnnav">Reservas</Link>
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
          <p id="copyright">&copy; Negoney's Cafeterias - Produzido por Marcos Eduardo & Erik Domnick</p>
        </footer>
      </BrowserRouter>
    </>
  );
};

export default App;