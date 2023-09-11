import React, {createContext, useContext} from "react";
import { Input } from "@nextui-org/react";
import ComboCiudades from "./ComboCiudades";


const Step2 = ({validar}) => {

  const [ciudadEntrega, setCiudadEntrega] = React.useState("");
  const [calleErrorState, setCalleErrorState] = React.useState('');
  const [alturaErrorState, setAlturaErrorState] = React.useState('');
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

  function validarCampos()
  {
    if(calleErrorState === "valid" && alturaErrorState === "valid" && ciudadEntrega !== "") {
      return true;
    }
    else{
      return false;
    }
  }
  const paso = validarCampos();
  validar(validarCampos());
  //console.log(props.campos[0]);
  
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-2">Por dónde lo retiramos?</h1>
      <p>Indica por donde debe pasar el cadete a retirar tus productos:</p>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 ">
          <ComboCiudades onSelectCategory ={(valorCiudad) => (setCiudadEntrega(valorCiudad))}/>
          <Input type="text" name="calle" onChange={calleValidation} errorMessage={calleErrorMessage} validationState={calleErrorState} label="Calle*"></Input>
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-5 ">
          <Input type="text" name="altura" onChange={alturaValidation} errorMessage={alturaErrorMessage} validationState={alturaErrorState} label="Altura*" ></Input>
          <Input type="text" name="referencia" label="Referencia" ></Input>
        </div>
        
    </div>
  )
};

export default Step2;
