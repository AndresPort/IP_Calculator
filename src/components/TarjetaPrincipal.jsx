import { useState, Fragment } from "react";
import "../Styles/TarjetaPrincipal.css";

const TarjetaPrincipal = () => {
  //------------------------------------------------------------
  const [inputType, setInputType] = useState("IP"); // Estado para manejar el tipo de entrada se deja ip para que se renderice asi por defecto
  const mostrarCampos = inputType === "IP"; // Verificar si es "IP"
  //------------------------------------------------------------
  const [btnIpAdressBgColor, setBtnIpAdressBgColor] =
    useState("rgb(44,142,47)");
  const [btnBinaryBgColor, setBtnBinaryBgColor] = useState("rgb(0,0,0)");

  //----------------------------Formateo para el ingreso de datos de Ip----------------------------
  const [valueIp, setValueIp] = useState("");

  const formatIpInput = (inputValue) => {
    let onlyNumbers = inputValue.replace(/[^0-9]/g, ""); // Solo permite números
    let parts = onlyNumbers.match(/\d{1,3}/g); // Divide en bloques de 3 dígitos
    return parts ? parts.join(".") : ""; // Une los bloques con puntos
  };

  const handleformatIp = (e) => {
    let newValueIp = formatIpInput(e.target.value);
    setValueIp(newValueIp);
  };

  //----------------------------Formateo para el ingreso de datos en Binario----------------------------
  const [valueBinary, setValueBinary] = useState("");

  const formatBinaryInput = (inputValueBinary) => {
    let onlyBinaries = inputValueBinary.replace(/[^01]/g, ""); // Permite solo 0 y 1
    let partsBinary = onlyBinaries.match(/\d{1,8}/g); // Divide en bloques de 8 dígitos
    return partsBinary ? partsBinary.join(".") : ""; // Une los bloques con puntos
  };

  const handleformatBinary = (e) => {
    let newValueBinary = formatBinaryInput(e.target.value);
    setValueBinary(newValueBinary);
  };

  //-----------------------Verificar que la dirección ip no sea mayor a 255-------------------------------------
  const ipValidation = () => {
    let dataInputIp = document.getElementById("dataInputIp").value;

    let byte1 = parseInt(dataInputIp.slice(0, 3), 10);
    let byte2 = parseInt(dataInputIp.slice(4, 7), 10);
    let byte3 = parseInt(dataInputIp.slice(8, 11), 10);
    let byte4 = parseInt(dataInputIp.slice(12, 15), 10);

    if (byte1 > 255 || byte2 > 255 || byte3 > 255 || byte4 > 255) {
      alert("el valor máximo por cada campo es 255");
    } else {
      fromIpToBinary(byte1, byte2, byte3, byte4, dataInputIp);
    }
  };
  //-----------------------Cambiar de dirección Ip a binario-------------------------------------
  const fromIpToBinary = (byte1, byte2, byte3, byte4, dataInputIp) => {
    let answerInput = document.getElementById("answerInput");
    let binario = [
      byte1.toString(2).padStart(8, "0"),
      byte2.toString(2).padStart(8, "0"),
      byte3.toString(2).padStart(8, "0"),
      byte4.toString(2).padStart(8, "0"),
    ];

    answerInput.value = binario.join(".");

    defineRedClass(dataInputIp);
  };

  //-----------------------Cambiar de binario a dirección Ip--------------------------
  const fromBinaryToIp = () => {
    let dataInputBinary = document.getElementById("dataInputBinary").value;
    let answerInput = document.getElementById("answerInput");
    let byte1 = dataInputBinary.slice(0, 8);
    let byte2 = dataInputBinary.slice(9, 17);
    let byte3 = dataInputBinary.slice(18, 26);
    let byte4 = dataInputBinary.slice(27, 35);

    let octect = [byte1, byte2, byte3, byte4]
      .map((bin) => parseInt(bin, 2))
      .join(".");

    answerInput.value = octect;

    defineRedClass(octect);
  };
  //-----------------------Define red class------------------------------------------------
  const defineRedClass = (ipDirection) => {
    let inputRedClass = document.getElementById("redClassInput");
    let byte1 = parseInt(ipDirection.slice(0, 3), 10);
    let byte2 = parseInt(ipDirection.slice(4, 7), 10);
    let byte3 = parseInt(ipDirection.slice(8, 11), 10);
    let byte4 = parseInt(ipDirection.slice(12, 15), 10);

    let redClass = "";

    if (byte1 <= 127) {
      redClass = "Clase A";
    } else if (byte2 > 127 && byte2 <= 191) {
      redClass = "Clase B";
    } else if (byte3 > 191 && byte2 <= 223) {
      redClass = "Clase C";
    } else if (byte4 > 223 && byte2 <= 239) {
      redClass = "Clase D";
    } else {
      redClass = "Clase E";
    }

    inputRedClass.value = redClass;

    defineRedType(byte1, byte2, byte3, byte4);
  };
  //-----------------------Define red type------------------------------------------------
  const defineRedType = (byte1, byte2) => {
    let redTypeInput = document.getElementById("redTypeInput");
    let redType = "";

    if (byte1 == 10) {
      redType = "Privada";
    } else if (byte1 == 172 && byte2 >= 16 && byte2 <= 31) {
      redType = "Privada";
    } else if (byte1 == 192 && byte2 == 168) {
      redType = "Privada";
    } else {
      redType = "Publica";
    }

    redTypeInput.value = redType;
  };
  //------------------------------------------------------------
  return (
    <div className="principalFrame">
      <h1 className="principalTittle">Calculadora de IPs</h1>
      <h3 className="dataTypeSubTittle">Tipo de dato a ingresar</h3>
      <button
        className="btnIpAdressOption"
        style={{ backgroundColor: btnIpAdressBgColor }}
        onClick={() => {
          setInputType("IP");
          setBtnIpAdressBgColor("rgb(44,142,47)");
          setBtnBinaryBgColor("rgb(0,0,0)");
        }}
      >
        Dirección IP
      </button>
      <button
        className="btnBinaryCodeOption"
        style={{ backgroundColor: btnBinaryBgColor }}
        onClick={() => {
          setInputType("BINARY");
          setBtnBinaryBgColor("rgb(44,142,47)");
          setBtnIpAdressBgColor("rgb(0,0,0)");
        }}
      >
        Código Binario
      </button>
      {!mostrarCampos && (
        <input
          type="text"
          className="dataInput"
          id="dataInputBinary"
          value={valueBinary}
          onChange={handleformatBinary}
          maxLength="35"
          placeholder="00000000.00000000.00000000.00000000"
        />
      )}

      {mostrarCampos && (
        <input
          type="text"
          className="dataInput"
          id="dataInputIp"
          value={valueIp}
          onChange={handleformatIp}
          maxLength="15"
          placeholder="192.168.002.255"
        />
      )}

      <label className="answerLabel">Resultado</label>
      <input type="text" className="answerInput" id="answerInput" disabled />

      <label className="redClassLabel">Clase de la red</label>
      <input
        type="text"
        className="redClassInput"
        id="redClassInput"
        disabled
      />

      <label className="redTypeLabel">Tipo de red</label>
      <input type="text" className="redTypeInput" id="redTypeInput" disabled />

      {mostrarCampos && (
        <button className="btnConvert" onClick={() => ipValidation()}>
          Convertir
        </button>
      )}

      {!mostrarCampos && (
        <button className="btnConvert" onClick={() => fromBinaryToIp()}>
          Convertir
        </button>
      )}
    </div>
  );
};
export default TarjetaPrincipal;
