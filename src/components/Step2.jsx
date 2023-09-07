import React from "react";
import { Input } from "@nextui-org/react";
import Map from "./Map";


const Step2 = () => {

  const [calleErrorState, setCalleErrorState] = React.useState('valid');
  const [alturaErrorState, setAlturaErrorState] = React.useState('valid');
  const [calleErrorMessage, setCalleErrorMessage] = React.useState('');
  const [alturaErrorMessage, setAlturaErrorMessage] = React.useState('');


  function alturaValidation(e){
    const altura = e.target.value;
    if (altura <= 0 || isNaN(+altura)) {
      setAlturaErrorState('invalid');
      setAlturaErrorMessage('Ingresa una altura valida');

    } else {
      setAlturaErrorState('valid');
      setAlturaErrorMessage('');
    }

  }


  function calleValidation(e){
    const calle = e.target.value;
    if (!calle) {
      setCalleErrorState('invalid');
      setCalleErrorMessage('Ingresa un nombre valido');
    }
    else {
      setCalleErrorState('valid');
      setCalleErrorMessage('');
    }
  }
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-2">Direccion del Comerico</h1>
      
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 ">

          <Input type="text" name="calle" onChange={calleValidation} errorMessage={calleErrorMessage} validationState={calleErrorState} label="Calle*"></Input>
          <Input type="text" name="alutra" onChange={alturaValidation} errorMessage={alturaErrorMessage} validationState={alturaErrorState} label="Altura*"></Input>


        </div>
      
      <p className="mt-5">Si deseas podes seleccionar en el mapa la ubicacion del comercio</p>
      <Map ></Map>
    </div>
  )
};

export default Step2;
