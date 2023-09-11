import React from "react";

const steps = [
  {
    id: "1",
    title: "Descripcion de productos",
  },
  {
    id: "2",
    title: "Dirección del Comercio",
  },
  {
    id: "3",
    title: "Direccion de Entrega",
  },
  {
    id: "4",
    title: "Pago",
  },
];

const Stepper = ({ currentStep }) => {
  return (
    <ol class="flex flex-col gap-5 justify-center w-full space-y-0 sm:items-center sm:flex-row sm:space-x-8 sm:space-y-0">
      {steps.map((step, index) => {
        const isCurrentStep = index + 1 === currentStep;
        const liStyles = isCurrentStep ? 'justify-center  text-azulTexto text-bold' : 'hidden md:flex  text-gray-500 dark:text-gray-400';
        const spanStyles = isCurrentStep ? 'border-blue-600' : 'border-gray-500';

        return (
          <li key={index} className={`flex items-center space-x-2.5 ${liStyles}`}>
            <span className={`flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ${spanStyles}`}>
              {step.id}
            </span>
            <span>
              <h3 className="font-medium leading-tight">{step.title}</h3>
              <p className="text-sm"></p>
            </span>
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;
