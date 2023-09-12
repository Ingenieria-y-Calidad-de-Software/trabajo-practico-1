import React, { useState, useMemo, useCallback, useEffect } from "react";
import { NextUIProvider, Button, ButtonGroup } from "@nextui-org/react";
import NavBar from "./components/NavBar";
import Stepper from "./components/Stepper";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";

const App = () => {
  
  const [currentStep, setCurrentStep] = useState(1);
  const isFirstStep = currentStep === 1;
  const [isValidStep1, setIsValidStep1] = useState(false)
  const [st2, setCurrentSt2] = useState(false);
  const [isValidStep3, setIsValidStep3] = useState(false);


  const isLastStep = currentStep === 4 || !isValidStep3 || !st2 || !isValidStep1;
  

  const CurrentForm = useMemo(() => {
    switch (currentStep) {
      case 1:
        return <Step1 validarStep1={(resValidacion) => setIsValidStep1(resValidacion)} />;
      case 2:
        return < Step2 validar = {(camp) =>  setCurrentSt2(camp)} />;
      case 3:
        return <Step3 validarStep3={(resValidacion) => setIsValidStep3(resValidacion)}/>;
      case 4:

        return <Step4 />;

      default:
        break;
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep !== 1 && !isValidStep1) {
      setIsValidStep1(true)
    }
    return () => {
    }
  }, [currentStep, isValidStep1])

  useEffect(() => {
    if (currentStep !== 2 && !st2) {
      setCurrentSt2(true) 
    }
    return () => {
    }
  }, [currentStep, st2])


  useEffect(() => {
    if (currentStep !== 3 && !isValidStep3) {
      setIsValidStep3(true) 
    }
    return () => {
    }
  }, [currentStep, isValidStep3])

  

  const handleBack = useCallback(() => {
    setCurrentStep((currentStep) => {
      return currentStep - 1;
    });
  }, []);

  const handleForward = useCallback(() => {
    setCurrentStep((currentStep) => {
      return currentStep + 1;
    });
  }, []);


  return (
    <div className="w-screen h-screen bg-fondo">
        <NavBar/>

    <NextUIProvider >
      <div className=" font-montserrat container mx-auto p-10">
        <Stepper currentStep={currentStep} />
        {CurrentForm}
        <ButtonGroup className="mt-5">
          <Button className="bg-botonNegativo" onPress={handleBack} isDisabled={isFirstStep}>
            {"Atrás"}
          </Button>
          <Button
            isDisabled={isLastStep}
            className="bg-botonPositivo" 
            onPress={isLastStep ? undefined : handleForward}
          >
            Siguiente
          </Button>
        </ButtonGroup>
      
      </div>
    </NextUIProvider>
    </div>
    
  );
};

export default App;
