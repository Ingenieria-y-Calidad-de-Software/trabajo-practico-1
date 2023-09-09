import React, { useState } from "react";
import './FileLoaderInput.css';

function FileLoaderInput(props) {
  const fileInputRef = React.useRef(null);

  const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);

  const verificarTamanio = (archivos) => {
    const archivosArray = Array.from(archivos);
    const imagenes = [];

    archivosArray.forEach((archivo) => {
      if (archivo.size > 5 * 1024 * 1024) {
        alert('El archivo ' + archivo.name + ' es muy grande, el tamaño máximo es de 5MB');
        setArchivosSeleccionados([]);
        setImagenesSeleccionadas([]);
        fileInputRef.current.value = null;
        return;
      }

      // Crear una URL para cada archivo de imagen
      const imagen = URL.createObjectURL(archivo);
      imagenes.push(imagen);
    });

    setArchivosSeleccionados(archivos);
    setImagenesSeleccionadas(imagenes);
    props.onFilesSelected(archivos);
  };

  const handleFileChange = (e) => {
    const archivos = e.target.files;
    verificarTamanio(archivos);
  };

  const eliminarImagen = (index) => {
    const nuevosArchivos = [...archivosSeleccionados];
    nuevosArchivos.splice(index, 1);
    setArchivosSeleccionados(nuevosArchivos);
  
    const nuevasImagenes = [...imagenesSeleccionadas];
    nuevasImagenes.splice(index, 1);
    setImagenesSeleccionadas(nuevasImagenes);
  
    // Llama a props.onFilesSelected con los archivos actualizados
    props.onFilesSelected(nuevosArchivos);
  };

  return (
    <div className="upload-container mt-4">
      <label htmlFor="file_upload">Buscar localmente o arrastra y suelta</label>
      <input type="file" id="file_upload" multiple onChange={handleFileChange} ref={fileInputRef} />
      
      {imagenesSeleccionadas.length > 0 && (
        <div className="image-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {imagenesSeleccionadas.map((imagen, index) => (
            <div key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
              <img src={imagen} alt={`Imagen ${index + 1}`} style={{ maxWidth: '200px', maxHeight: '200px', width: 'auto', height: 'auto', marginBottom: '5px' }} />
              <span
                className="eliminar-imagen"
                onClick={() => eliminarImagen(index)}
                style={{ position: 'absolute', top: '0', right: '0', cursor: 'pointer', background: 'red', color: 'white', padding: '3px' }}
              >
                X
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default FileLoaderInput;
