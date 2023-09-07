import React from "react";
import { Input, Button } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

const labelFileStyles = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px 20px',
  cursor: 'pointer',
  marginTop: '10px',
  borderRadius: '10px',
};
const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "nombre",
    label: "NOMBRE",
  },
  {
    key: "cantidad",
    label: "CANTIDAD",
  },
  {
    key: "url",
    label: "IMAGENES",
  },
  {
    key: "obs",
    label: "OBSERVACION",
  },
  {
    key: "actions",
    label: "ACCIONES",
  }
];
const Step1 = () => {

  const [productos, setProductos] = React.useState([]);
  const [archivosSeleccionados, setArchivosSeleccionados] = React.useState(null);
  // Validaciones de campos obligatorios
  const [nombreErrorState, setNombreErrorState] = React.useState('valid');
  const [cantidadErrorState, setCantidadErrorState] = React.useState('valid');
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [cantidadErrorMessage, setCantidadErrorMessage] = React.useState('');

  const fileInputRef = React.useRef(null);
  const productForm = React.useRef(null);

  function addProduct() {


  }

  const verificarTamanio = (archivos) => {
    const archivosArray = Array.from(archivos);
    archivosArray.forEach((archivo) => {
      if (archivo.size > 5 * 1024 * 1024) {
        alert('El archivo ' + archivo.name + ' es muy grande, el tamaño maximo es de 5MB');
        setArchivosSeleccionados(null);
        fileInputRef.current.value = null; // Restablecer el valor del input file
        return;
      }
    })
    setArchivosSeleccionados(archivos);

  }

  const handleFileChange = (e) => {
    const archivos = e.target.files;
    verificarTamanio(archivos);

  };

  const cancelFileUploaded = () => {
    setArchivosSeleccionados(null);
    fileInputRef.current.value = null; // Restablecer el valor del input file
  };

  function validForm() {
    if (!productForm.current.nombre.value) {
      setNombreErrorState('invalid');
      setNameErrorMessage('Ingresa un nombre valido');
    }
    else {
      setNombreErrorState('valid');
      setNameErrorMessage('');
    }

    if (productForm.current.cantidad.value <= 0 || isNaN(+productForm.current.cantidad.value)) {
      setCantidadErrorState('invalid');
      setCantidadErrorMessage('Ingresa una cantidad valida');

    } else {
      setCantidadErrorState('valid');
      setCantidadErrorMessage('');
    }

    if (!productForm.current.nombre.value || productForm.current.cantidad.value <= 0 || isNaN(+productForm.current.cantidad.value)) {
      return false;
    }
    return true;

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validForm()) return;

    const producto = {
      key: productos.length + 1,
      nombre: productForm.current.nombre.value,
      cantidad: productForm.current.cantidad.value,
      url: [...archivosSeleccionados].map((archivo) => archivo.name).join(', ') || 'No se selecciono ningun archivo',
      obs: productForm.current.observacion.value,
    };
    setProductos([...productos, producto]);
    productForm.current.reset();
    cancelFileUploaded();


  }


  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-2">Agrega Productos al Carrito</h1>
      <form onSubmit={handleSubmit} ref={productForm}>
        <p>Llena los siguientes campos para cada producto:</p>
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
          <Input type="text" name="nombre" label="Nombre del producto*" errorMessage={nameErrorMessage} validationState={nombreErrorState} className="" />
          <Input type="number" name="cantidad" label="Cantidad*" errorMessage={cantidadErrorMessage} validationState={cantidadErrorState} className="" />
          <Input type="text" name="observacion" label="Observacion" className="" />
        </div>
        <div className="flex flex-col mt-5">

          <p>Si deseas podes seleccionar fotos para mostrarle al cadete lo que debe buscar:</p>
          <label style={labelFileStyles} htmlFor="archivoInput">{(archivosSeleccionados && [...archivosSeleccionados].map((archivo) => archivo.name).join(', ')) || "Selecciona una o mas fotos (.png, .jpeg)"}</label><br />
          <input multiple type="file" id="archivoInput" name="url" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/png, image/jpeg" />
          {archivosSeleccionados && (<button onClick={cancelFileUploaded}>Cancelar Selección</button>)}
          <Button color="success" type="submit" onClick={addProduct} className="w-full md:w-fit self-end font-semibold mt-5" style={{ color: '#fff' }}>Agregar al Carrito</Button>
        </div>
      </form>

      {/* CARRITO */}

      <h2 className="text-lg font-bold mb-2">Tu Carrito</h2>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={productos}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)} </TableCell>}

            </TableRow>
          )}

        </TableBody>
      </Table>
    </div>
  );
};

export default Step1;
