import { Fragment } from "react";
import React from "react";
import './FileLoaderInput.css';

const labelFileStyles = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px 20px',
  cursor: 'pointer',
  marginTop: '10px',
  borderRadius: '10px',
};



function DragAndDropUploadFile() {
  const fileInputRef = React.useRef(null);
  const [archivosSeleccionados, setArchivosSeleccionados] = React.useState(null);


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


  return (
    <Fragment>

      <div  className="upload-container mt-4">
        <label htmlFor="file_upload">Buscar localmente o arrastra y solta</label>
        
        <input type="file" id="file_upload" multiple />
      </div>
      <br />
    </Fragment>

  );
}

export default DragAndDropUploadFile;