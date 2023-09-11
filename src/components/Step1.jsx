import React, { useState, useRef } from "react";
import { Button } from "@nextui-org/react";
import FileLoaderInput from "./FileLoaderInput";

const Step1 = (props) => {
  const [productos, setProductos] = useState([]);
  const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);
  const [descripcionErrorState, setDescripcionErrorState] = useState("valid");
  const [descripcionErrorMessage, setDescripcionErrorMessage] = useState("");
  const [pedidoAgregado, setPedidoAgregado] = useState(false); // Estado para rastrear si se agregó el producto al carrito

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

    const archivosSeleccionadosArray = Array.from(archivosSeleccionados);

    const urls =
      archivosSeleccionadosArray.length > 0
        ? archivosSeleccionadosArray.map((archivo) => URL.createObjectURL(archivo))
        : [];

    const producto = {
      key: productos.length + 1,
      descripcion: productForm.current.descripcion.value,
      urls: urls,
    };

    setProductos([...productos, producto]);
    productForm.current.reset();
    limpiarErrorDescripcion();
    props.onAgregarAlCarrito();
    setArchivosSeleccionados([]);
    setPedidoAgregado(true); // Marcar el producto como agregado al carrito
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
    setPedidoAgregado(true); // Marcar el producto como agregado al carrito
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
            color={pedidoAgregado ? "white" : "success"}
            type="button"
            onClick={agregarProducto}
            className={`w-full md:w-fit self-end font-semibold mt-5 ${
              pedidoAgregado
                ? "border border-green-500 text-green-500"
                : "text-white bg-success"
            }`}
            disabled={pedidoAgregado}
          >
            {pedidoAgregado ? "Pedido Agregado" : "Agregar Pedido"}
          </Button>
        </div>
      </form>

      <h1 className="text-2xl font-bold mb-2">Tu Pedido</h1>
      <div className="flex flex-wrap">
        {productos.map((item) => (
          <div key={item.key} className="mb-4" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="border p-4">
              <p className="font-semibold">Descripción:</p>
              <p>{item.descripcion}</p>
            </div>
            <div className="border p-4 ml-4">
              <p className="font-semibold">Imágenes:</p>
              {item.urls.length > 0 ? (
                <div className="flex">
                  {item.urls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Imagen ${index + 1}`}
                      style={{ maxWidth: "100px", maxHeight: "100px", marginRight: "10px" }}
                    />
                  ))}
                </div>
              ) : (
                <p>No hay imágenes cargadas</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step1;
