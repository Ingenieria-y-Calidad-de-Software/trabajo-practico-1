import React from "react";
import CustomRadio from "./CustomRatio";
import { RadioGroup, Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
const Step4 = () => {

  const [payMethod, setPayMethod] = React.useState('cash');

  function handlePayMethodChange(e) {
    const methodSelected = (e.target.value);
    setPayMethod(methodSelected);
    if (methodSelected === 'cash') {

    }
    else {

    }


  }

  function handleBuy(e) {
    e.preventDefault();
    console.log('compra finalizada');
  }
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-2">Forma de Pago</h1>
      <RadioGroup onChange={handlePayMethodChange} defaultValue='cash' label="Selecciona el medio de pago:" >
        <div className="flex gap-5 flex-wrap md:flex-nowrap w-full">
          <CustomRadio description="" value="cash" defaultChecked>
            Efectivo
          </CustomRadio>
          <CustomRadio description="VISA unicamente" value="card">
            Tarjeta
          </CustomRadio>
        </div>

      </RadioGroup>

      {payMethod === 'card' && (
        <form action="" className="mt-5" >
          <p className="mb-3">Completa los siguientes datos para finalizar tu pedido:</p>
          <Input type="text" label='Nombre del Titular' className="mb-4"></Input>
          <Input type="text" label='Numero de Tarjeta' className="mb-4"></Input>
          <div className="flex gap-4">
            <Input type="text" label='Fecha de Vencimiento' className="mb-4"></Input>
            <Input type="text" label='CVC/CVV' className="mb-4"></Input>
          </div>
        </form>
      )}

      {payMethod === 'cash' && (
        <form action="" className="mt-5">
          <p className="mb-3">Con cuanto vas a abonar?</p>
          <Input type="number" label='Monto'></Input>
        </form>
      )}
      <div className="flex w-full items-center justify-center">

        <Button color="success" type="submit" onClick={handleBuy} className="w-full md:w-1/3 font-semibold mt-5" style={{ color: '#fff' }}>Finalizar Compra</Button>
      </div>



    </div>
  );
};

export default Step4;
