import React, { useState, useRef } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import FileLoaderInput from "./FileLoaderInput";

const Step1 = ({ validarStep1 }) => {
  const [productos, setProductos] = useState([]);
  const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);
  const [descripcionErrorState, setDescripcionErrorState] = useState("");
  const [descripcionErrorMessage, setDescripcionErrorMessage] = useState("");
  const [pedidoAgregado, setPedidoAgregado] = useState(false);
  const productForm = useRef(null);

  const limpiarErrorDescripcion = () => {
    setDescripcionErrorState("valid");
    setDescripcionErrorMessage("");
  };

  function descripcionValidation(e) {
    const descripcion = e.target.value;
    if (!descripcion) {
      setDescripcionErrorState("invalid");
      setDescripcionErrorMessage("Ingresa un nombre valido");
    } else {
      setDescripcionErrorState("valid");
      setDescripcionErrorMessage("");
    }
  }

  const validar = () => {
    if (descripcionErrorState === "valid") {
      return true;
    }
    return false;
  };
  validarStep1(validar);

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-2">Qué debe buscar el cadete ?</h1>
      <form ref={productForm}>
        <p>Llena el campo descripción indicando los productos a buscar:</p>
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
          <Textarea
            type="text"
            name="descripcion"
            onChange={descripcionValidation}
            errorMessage={descripcionErrorMessage}
            validationState={descripcionErrorState}
            label="Descripcion de productos*"
            size="lg"
          ></Textarea>
        </div>
        <div className="flex flex-col mt-5">
          <p>
            Si deseas, puedes seleccionar fotos para mostrarle al cadete lo que
            debe buscar:
          </p>
          <FileLoaderInput onFilesSelected={setArchivosSeleccionados} />
        </div>
      </form>
    </div>
  );
};

export default Step1;
