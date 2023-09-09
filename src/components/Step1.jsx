import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
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

const Step1 = () => {
  const [productos, setProductos] = useState([]);
  const [archivosSeleccionados, setArchivosSeleccionados] = useState(null);
  const [descripcionErrorState, setDescripcionErrorState] = useState('valid');
  const [descripcionErrorMessage, setDescripcionErrorMessage] = useState('');

  const productForm = React.useRef(null);

  function addProduct() {
    if (!validForm()) return;
  
    const url = archivosSeleccionados ? [...archivosSeleccionados].map((archivo) => (
      <img src={URL.createObjectURL(archivo)} alt={archivo.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
    )) : 'No se seleccionó ninguna imagen';
  
    const producto = {
      key: productos.length + 1,
      descripcion: productForm.current.descripcion.value,
      url: url,
    };
    setProductos([...productos, producto]);
    productForm.current.reset();
  }
  

  function validForm() {
    if (!productForm.current.descripcion.value) {
      setDescripcionErrorState('invalid');
      setDescripcionErrorMessage('Ingresa una descripción válida');
      return false;
    } else {
      setDescripcionErrorState('valid');
      setDescripcionErrorMessage('');
      return true;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validForm()) return;

    const producto = {
      key: productos.length + 1,
      descripcion: productForm.current.descripcion.value,
      url: [...archivosSeleccionados].map((archivo) => archivo.name).join(', ') || 'No se seleccionó ningún archivo',
    };
    setProductos([...productos, producto]);
    productForm.current.reset();
  };

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-2">Agrega Productos al Carrito</h1>
      <form onSubmit={handleSubmit} ref={productForm}>
        <p>Llena el campo descripción para los productos a pedir:</p>
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
          <textarea
            name="descripcion"
            placeholder="Descripción de los productos*"
            rows="4"
            style={{ width: '100%' }}
            className={`border border-gray-300 p-2 rounded-md ${descripcionErrorState}`}
          ></textarea>
          {descripcionErrorMessage && (
            <div className="text-red-500">{descripcionErrorMessage}</div>
          )}
        </div>
        <div className="flex flex-col mt-5">
          <p>Si deseas, puedes seleccionar fotos para mostrarle al cadete lo que debe buscar:</p>
          <FileLoaderInput onFilesSelected={(archivos) => setArchivosSeleccionados(archivos)} />
          <Button
            color="success"
            type="button"
            onClick={addProduct}
            className="w-full md:w-fit self-end font-semibold mt-5"
            style={{ color: '#fff' }}
          >
            Agregar al Carrito
          </Button>
        </div>
      </form>

      <h2 className="text-lg font-bold mb-2">Tu Pedido</h2>
      <Table aria-label="Example table with dynamic content">
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
