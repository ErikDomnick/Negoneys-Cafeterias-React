import { useEffect } from "react";

const NOME_SITE = "Negoney's Cafeterias";

function useTitulo(titulo) {
  useEffect(() => {
    document.title = `${titulo} | ${NOME_SITE}`;
  }, [titulo]);
}

export default useTitulo;