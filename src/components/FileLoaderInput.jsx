import React, { useState, useRef } from "react";
import "./FileLoaderInput.css";

function FileLoaderInput(props) {
  const fileInputRef = useRef(null);

  const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);

  const verificarTamanio = (archivos) => {
    const archivosArray = Array.from(archivos);
    const nuevasImagenes = [...imagenesSeleccionadas]; // Copia las imágenes existentes

    archivosArray.forEach((archivo) => {
      if (archivo.size > 5 * 1024 * 1024) {
        alert(
          "El archivo " +
            archivo.name +
            " es muy grande, el tamaño máximo es de 5MB"
        );
        limpiarSeleccion();
        return;
      }

      // Crear una URL para cada archivo de imagen
      const imagen = URL.createObjectURL(archivo);
      nuevasImagenes.push(imagen);
    });

    setArchivosSeleccionados(archivos);
    setImagenesSeleccionadas(nuevasImagenes);
    props.onFilesSelected(archivos);
  };

  const handleFileChange = (e) => {
    const archivos = e.target.files;
    verificarTamanio(archivos);
  };

  const eliminarImagen = (index) => {
    const nuevosArchivos = [...archivosSeleccionados];
    const nuevasImagenes = [...imagenesSeleccionadas];

    nuevosArchivos.splice(index, 1);
    nuevasImagenes.splice(index, 1);

    setArchivosSeleccionados(nuevosArchivos);
    setImagenesSeleccionadas(nuevasImagenes);

    // Llama a props.onFilesSelected con los archivos actualizados
    props.onFilesSelected(nuevosArchivos);
  };

  const limpiarSeleccion = () => {
    setArchivosSeleccionados([]);
    setImagenesSeleccionadas([]);
    fileInputRef.current.value = null;
  };

  return (
    <div className="upload-container mt-4">
      <label htmlFor="file_upload">Buscar localmente o arrastra y suelta</label>
      <input
        type="file"
        id="file_upload"
        multiple
        onChange={handleFileChange}
        ref={fileInputRef}
      />

      {imagenesSeleccionadas.length > 0 && (
        <div>
          <h1 className="text-2xl font-bold mb-2 mt-2">Tus Imagenes</h1>
          <div
            className="mt-3 flex wrap image-container"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {imagenesSeleccionadas.map((imagen, index) => (
              <div
                key={index}
                className="rounded-md"
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginRight: "10px",
                }}
              >
                <img
                  src={imagen}
                  alt={`Imagen ${index + 1}`}
                  className="rounded-lg"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    width: "auto",
                    height: "auto",
                    marginBottom: "5px",
                  }}
                />
                <span
                  className="eliminar-imagen"
                  onClick={() => eliminarImagen(index)}
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    cursor: "pointer",
                    background: "red",
                    color: "white",
                    padding: "3px",
                  }}
                >
                  X
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FileLoaderInput;
