/*o ponto de entrada,renderiza o App.jsx e carrega o index.css (os estilos globais e td mais)*/

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App/>
  </StrictMode>,
);