import React from "react";
import { Input } from "@nextui-org/react";
import CustomRadio from "./CustomRatio";
import { RadioGroup } from "@nextui-org/react";


const Step3 = () => {

  const [calleErrorState, setCalleErrorState] = React.useState('valid');
  const [alturaErrorState, setAlturaErrorState] = React.useState('valid');
  const [calleErrorMessage, setCalleErrorMessage] = React.useState('');
  const [alturaErrorMessage, setAlturaErrorMessage] = React.useState('');
  const [pisoErrorState, setPisoErrorState] = React.useState('valid');
  const [pisoErrorMessage, setPisoErrorMessage] = React.useState('');
  const [numeroErrorState, setNumeroErrorState] = React.useState('valid');
  const [numeroErrorMessage, setNumeroErrorMessage] = React.useState('');

  function alturaValidation(e) {
    const altura = e.target.value;
    if (altura <= 0 || isNaN(+altura)) {
      setAlturaErrorState('invalid');
      setAlturaErrorMessage('Ingresa una altura valida');

    } else {
      setAlturaErrorState('valid');
      setAlturaErrorMessage('');
    }

  }

  function calleValidation(e) {
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

  function pisoValidation(e) {
    const piso = e.target.value;
    if (piso < 0 || isNaN(+piso)) {
      setPisoErrorState('invalid');
      setPisoErrorMessage('Ingresa una altura valida');

    } else {
      setPisoErrorState('valid');
      setPisoErrorMessage('');
    }

  }

  function numeroValidation(e) {
    const numero = e.target.value;
    if (numero < 0 || isNaN(+numero)) {
      setNumeroErrorState('invalid');
      setNumeroErrorMessage('Ingresa una altura valida');

    } else {
      setNumeroErrorState('valid');
      setNumeroErrorMessage('');
    }

  }
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-2">Direccion de Entrega</h1>
      <p>Indica donde queres recibir tu productos:</p>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4 ">
        <Input type="text" name="calle" onChange={calleValidation} errorMessage={calleErrorMessage} validationState={calleErrorState} label="Calle*"></Input>
        <Input type="text" name="alutra" onChange={alturaValidation} errorMessage={alturaErrorMessage} validationState={alturaErrorState} label="Altura*"></Input>

      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-5">
        <Input type="text" name="calle" onChange={pisoValidation} errorMessage={pisoErrorMessage} validationState={pisoErrorState} label="Piso Edificio"></Input>
        <Input type="text" name="alutra" onChange={numeroValidation} errorMessage={numeroErrorMessage} validationState={numeroErrorState} label="Numero Depto."></Input>

      </div>
      <h1 className="text-2xl font-bold mb-2 mt-5">Momento de Entrega</h1>
      <RadioGroup label="Indica cuando queres recibir los productos" >
        <div className="flex gap-5 flex-wrap md:flex-nowrap w-full">
          <CustomRadio description="Llegara lo antes posible" value="fast" >
            Ahora
          </CustomRadio>
          <CustomRadio description="Programa una fecha y hora de recepcion" value="custom_date">
            Fecha/Hora
          </CustomRadio>
        </div>

      </RadioGroup>

    </div>
  );
};

export default Step3;
