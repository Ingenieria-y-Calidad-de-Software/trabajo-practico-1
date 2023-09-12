import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import CustomRadio from "./CustomRatio";
import { RadioGroup, Card, CardBody } from "@nextui-org/react";
import ComboCiudades from "./ComboCiudades";

const Step3 = ({ validarStep3 }) => {
  const [calleErrorState, setCalleErrorState] = useState("");
  const [alturaErrorState, setAlturaErrorState] = useState("");
  const [calleErrorMessage, setCalleErrorMessage] = useState("");
  const [alturaErrorMessage, setAlturaErrorMessage] = useState("");
  const [momentoEntrega, setMomentoEntrega] = useState("fast");
  const [ciudadEntrega, setCiudadEntrega] = useState("");
  const [fechaHoraEntrega, setFechaHoraEntrega] = useState("");

  function alturaValidation(e) {
    const altura = e.target.value;
    if (altura <= 0 || isNaN(altura)) {
      setAlturaErrorState("invalid");
      setAlturaErrorMessage("Ingresa una altura valida");
    } else {
      setAlturaErrorState("valid");
      setAlturaErrorMessage("");
    }
  }

  function calleValidation(e) {
    const calle = e.target.value;
    if (!calle) {
      setCalleErrorState("invalid");
      setCalleErrorMessage("Ingresa un nombre de calle válido");
    } else {
      setCalleErrorState("valid");
      setCalleErrorMessage("");
    }
  }

  const validarStep = () => {
    if (
      calleErrorState === "valid" &&
      alturaErrorState === "valid" &&
      ciudadEntrega !== "" &&
      ((momentoEntrega === "custom_date" && fechaHoraEntrega !== "") ||
        momentoEntrega === "fast")
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleCambioRadio = (event) => {
    setMomentoEntrega(event.target.value);
  };

  const convertToDateTimeLocalString = (fecha) => {
    var date = new Date(fecha);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const finalDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    return finalDate;
  };

  validarStep3(validarStep);

  return (
    <>
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-2">Dónde lo enviamos?</h1>
        <p>Indica donde queres recibir tu productos:</p>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 ">
          <ComboCiudades
            onSelectCategory={(valorCiudad) => setCiudadEntrega(valorCiudad)}
          />

          <Input
            type="text"
            name="calle"
            onChange={calleValidation}
            errorMessage={calleErrorMessage}
            validationState={calleErrorState}
            label="Calle*"
          ></Input>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-5">
          <Input
            type="text"
            name="altura"
            onChange={alturaValidation}
            errorMessage={alturaErrorMessage}
            validationState={alturaErrorState}
            label="Altura*"
          ></Input>
          <Input type="text" name="referencia" label="Referencia"></Input>
        </div>
        <h1 className="text-2xl font-bold mb-2 mt-5">
          Cuando queres recibirlo?
        </h1>
        <RadioGroup
          label="Indica cuando queres recibir los productos"
          defaultValue="fast"
        >
          <div className="flex gap-5 flex-wrap md:flex-nowrap w-full">
            <CustomRadio
              description="Llegara lo antes posible"
              value="fast"
              defaultChecked
              onChange={handleCambioRadio}
            >
              Ahora
            </CustomRadio>
            <CustomRadio
              description="Programa una fecha y hora de recepcion"
              value="custom_date"
              onChange={handleCambioRadio}
            >
              Fecha/Hora
            </CustomRadio>
          </div>
          <div>
            {momentoEntrega.match("custom_date") ? (
              <div className="flex flex-row gap-5 flex-wrap md:flex-nowrap w-full">
                <Card className=" grow basis-1/2 inline-flex items-center">
                  <CardBody>
                    <input
                      type="datetime-local"
                      id="meeting-time"
                      name="meeting-time"
                      title="Fecha y hora de entrega"
                      defaultValue={""}
                      min={convertToDateTimeLocalString(Date.now())}
                      max={convertToDateTimeLocalString(Date.now() + 604800000)}
                      onChange={(event) =>
                        setFechaHoraEntrega(event.target.value)
                      }
                    />
                  </CardBody>
                </Card>
                <Card className=" invisible basis-1/2 inline-flex items-center">
                  <CardBody></CardBody>
                </Card>
                <Card className=" invisible basis-1/2 inline-flex items-center">
                  <CardBody></CardBody>
                </Card>
              </div>
            ) : (
              <></>
            )}
          </div>
        </RadioGroup>
      </div>
    </>
  );
};

export default Step3;
