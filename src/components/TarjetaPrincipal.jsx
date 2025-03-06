import { useState, Fragment } from "react";

const TarjetaPrincipal = () => {
  const [inputType, setInputType] = useState("IP"); // Estado para manejar el tipo de entrada se deja ip para que se renderice asi por defecto

  const mostrarCampos = inputType === "IP"; // Verificar si es "IP"
  return (
    <div className="principalFrame">
      <h1 className="principalTittle">Calculadora de IPs</h1>
      <h3 className="dataTypeSubTittle">Tipo de dato a ingresar</h3>
      <button className="btnIpAdressOption" onClick={() => setInputType("IP")}>
        Dirección IP
      </button>
      <button
        className="btnBinaryCodeOption"
        onClick={() => setInputType("BINARY")}
      >
        Código Binario
      </button>
      <input type="text" className="dataInput" placeholder="192.168.2.255" />
      {mostrarCampos && (
        <>
          <label className="answerLabel">Resultado</label>
          <input type="text" className="answerInput" disabled />

          <label className="subRedMaskLabel">Máscara de subred</label>
          <input type="text" className="subRedMaskInput" disabled />

          <label className="redTypeLabel">Tipo de red</label>
          <input type="text" className="redTypeInput" disabled />
        </>
      )}
      <button className="btnConvert"> Convertir </button>
    </div>
  );
};

export default TarjetaPrincipal;
