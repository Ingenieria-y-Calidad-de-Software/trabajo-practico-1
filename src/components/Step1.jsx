import React, { useState, useRef } from "react";
import { Button } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import FileLoaderInput from "./FileLoaderInput";

const columns = [
  {
    key: "descripcion",
    label: "DESCRIPCIÓN",
  },
  {
    key: "url",
    label: "IMÁGENES",
  },
];

const Step1 = (props) => {
  const [productos, setProductos] = useState([]);
  const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);
  const [descripcionErrorState, setDescripcionErrorState] = useState("valid");
  const [descripcionErrorMessage, setDescripcionErrorMessage] = useState("");

  const productForm = useRef(null);

  // Función para limpiar el estado de error de descripción
  const limpiarErrorDescripcion = () => {
    setDescripcionErrorState("valid");
    setDescripcionErrorMessage("");
  };

  // Función para agregar un producto
  const agregarProducto = () => {
    if (!productForm.current.descripcion.value) {
      setDescripcionErrorState("invalid");
      setDescripcionErrorMessage("Ingresa una descripción válida");
      return;
    }
  
    // Asegúrate de que archivosSeleccionados sea un array
    const archivosSeleccionadosArray = Array.from(archivosSeleccionados);
  
    const url =
      archivosSeleccionadosArray.length > 0
        ? archivosSeleccionadosArray.map((archivo) => (
            <img
              key={archivo.name}
              src={URL.createObjectURL(archivo)}
              alt={archivo.name}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          ))
        : 'No se seleccionó ninguna imagen';
  
    const producto = {
      key: productos.length + 1,
      descripcion: productForm.current.descripcion.value,
      url: url,
    };
  
    setProductos([...productos, producto]);
    productForm.current.reset();
    limpiarErrorDescripcion();
    props.onAgregarAlCarrito();
    setArchivosSeleccionados([]);
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productForm.current.descripcion.value) {
      setDescripcionErrorState("invalid");
      setDescripcionErrorMessage("Ingresa una descripción válida");
      return;
    }

    const archivosSeleccionadosArray = Array.from(archivosSeleccionados);

    const producto = {
      key: productos.length + 1,
      descripcion: productForm.current.descripcion.value,
      url:
        archivosSeleccionadosArray.length > 0
          ? archivosSeleccionadosArray.map((archivo) => archivo.name).join(", ")
          : "No se seleccionó ningún archivo",
    };
    

    setProductos([...productos, producto]);
    productForm.current.reset();
    limpiarErrorDescripcion();
    props.onAgregarAlCarrito();
  };

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-2">Agregar qué debe buscar el cadete</h1>
      <form onSubmit={handleSubmit} ref={productForm}>
        <p>Llena el campo descripción indicando los productos a buscar:</p>
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
          <textarea
            name="descripcion"
            placeholder="Descripción de los productos*"
            rows="4"
            style={{ width: "100%" }}
            className={`border border-gray-300 p-2 rounded-md ${descripcionErrorState}`}
          ></textarea>
          {descripcionErrorMessage && (
            <div className="text-red-500">{descripcionErrorMessage}</div>
          )}
        </div>
        <div className="flex flex-col mt-5">
          <p>Si deseas, puedes seleccionar fotos para mostrarle al cadete lo que debe buscar:</p>
          <FileLoaderInput onFilesSelected={setArchivosSeleccionados} />
          <Button
            color="success"
            type="button"
            onClick={agregarProducto}
            className="w-full md:w-fit self-end font-semibold mt-5"
            style={{ color: "#fff" }}
          >
            Agregar al Carrito
          </Button>
        </div>
      </form>

      <h1 className="text-2xl font-bold mb-2">Tu Pedido</h1>
      <Table aria-label="Ejemplo de tabla con contenido dinámico">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={productos}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Step1;
