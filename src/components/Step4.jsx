import React from "react";
import CustomRadio from "./CustomRatio";
import { RadioGroup, Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import swal from 'sweetalert';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const columns = [
  {
    key: "descripcion",
    label: "DESCRIPCION DEL PEDIDO",
  },
  {
    key: "total",
    label: "TOTAL",
  },
];

const Step4 = () => {
 
  const [payMethod, setPayMethod] = React.useState("cash");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardName, setCardName] = React.useState("");
  const [expiration, setExpiration] = React.useState("");
  const [codeNumber, setCodeNumber] = React.useState("");
  const [cash, setCash] = React.useState("");

  function handlePayMethodChange(e) {
    const methodSelected = e.target.value;
    setPayMethod(methodSelected);
  }

  function calculatePrice() {
    const min = 1000
    const max = 5000
    const distance = Math.random() * ((max-min) + min);
    const price = (distance / 100) * 50;
    return ("$" + Math.round(price));
  }

  function validateForm() {
    if (payMethod === "card") {
      const number = cardNumber.toString();
      const numExp = expiration.toString();
      const code = codeNumber.toString();

      if (cardName.length === 0) {
        swal({
          title: "Error!",
          text: "Falló el registro de pago. Nombre de titular no fue ingresado.",
          icon: "error",
          button: "Aceptar"
        });
        return
      } else if (number.length !== 16 || number.charAt(0) !== "4") {
        swal({
          title: "Error!",
          text: "Falló el registro de pago. Número de tarjeta inválido. Sólo se acepta VISA.",
          icon: "error",
          button: "Aceptar"
        });
        return
      } else if (numExp.length === 0) {
        swal({
          title: "Error!",
          text: "Falló el registro de pago. Número de vencimiento inválido.",
          icon: "error",
          button: "Aceptar"
        });
        return
      } else if (code.length !== 3) {
        swal({
          title: "Error!",
          text: "Falló el registro de pago. CVC/CVV inválido.",
          icon: "error",
          button: "Aceptar"
        });
        return
      }
    }
    
    if (payMethod === "cash") {
      const cash1 = cash.toString();
      if (cash1.length === 0) {
        swal({
          title: "Error!",
          text: "Por favor, indique el monto a pagar.",
          icon: "error",
          button: "Aceptar"
        });
        return
      }
    }

    swal({
      title: "Pedido finalizado!",
      text: "Muchas gracias por tu compra",
      icon: "success",
      button: "Aceptar"
    });
  }

  return (
    <>
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-2">Resumen</h1>
        <Table>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Envío: Producto de "Lo que sea"</TableCell>
              <TableCell>{calculatePrice()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-2">Cómo vas a abonar?</h1>
        <RadioGroup
          onChange={handlePayMethodChange}
          defaultValue="cash"
          label="Selecciona el medio de pago:"
        >
          <div className="flex gap-5 flex-wrap md:flex-nowrap w-full">
            <CustomRadio description="" value="cash" defaultChecked>
              Efectivo
            </CustomRadio>
            <CustomRadio value="card">Tarjeta</CustomRadio>
          </div>
        </RadioGroup>

        {payMethod === "card" && (
          <form action="" className="mt-5">
            <p className="mb-3">
              Completa los siguientes datos para finalizar tu pedido:
            </p>
            <Input
              onChange={(e) => setCardName(e.target.value)}
              type="text"
              label="Nombre del Titular"
              className="mb-4"
            ></Input>
            <Input
              type="number"
              onChange={(e) => setCardNumber(e.target.value)}
              label="Número de Tarjeta"
              className="mb-4"
            ></Input>
            {(validateMastercard) => {
              <small>Mastercard</small>
            }
            }
            <div className="flex gap-4">
              <Input
                onChange={(e) => setExpiration(e.target.value)}
                type="text"
                label="Fecha de Vencimiento"
                className="mb-4"
              ></Input>
              <Input 
                onChange={(e) => setCodeNumber(e.target.value)}
                type="number" 
                label="CVC/CVV" 
                className="mb-4">
              </Input>
            </div>
          </form>
        )}

        {payMethod === "cash" && (
          <form action="" className="mt-5">
            <p className="mb-3">Con cuánto vas a abonar?</p>
            <Input 
              onChange={(e) => setCash(e.target.value)}
              type="number" 
              label="Monto">  
            </Input>
          </form>
        )}
        <div className="flex w-full items-center justify-center">
          <Button
            color="success"
            type="submit"
            onClick={() => {
              validateForm()
            }}
            className="w-full md:w-1/3 font-semibold mt-5"
            style={{ color: "#fff" }}
          >
            Finalizar Compra
          </Button>
        </div>
      </div>
    </>
  );
};

export default Step4;
