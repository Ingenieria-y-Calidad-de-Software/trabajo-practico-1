import React, { useState, useMemo, useCallback, useEffect } from "react";
import { NextUIProvider, Button, ButtonGroup } from "@nextui-org/react";

import Stepper from "./components/Stepper";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const isFirstStep = currentStep === 1;
  const [isValidStep3, setIsValidStep3] = useState(false);


  const isLastStep = currentStep === 4 || !isValidStep3;

  const CurrentForm = useMemo(() => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 validarStep3={(resValidacion) => setIsValidStep3(resValidacion)}/>;
      case 4:

        return <Step4 />;

      default:
        break;
    }
  }, [currentStep]);

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
    <NextUIProvider>
      <div class="container mx-auto p-10">
        <Stepper currentStep={currentStep} />
        {CurrentForm}
        <ButtonGroup className="mt-5">
          <Button color="default" onPress={handleBack} isDisabled={isFirstStep}>
            {"Atrás"}
          </Button>
          <Button
            isDisabled={isLastStep}
            color="primary"
            onPress={isLastStep ? undefined : handleForward}
          >
            Siguiente
          </Button>
        </ButtonGroup>
      </div>
    </NextUIProvider>
  );
};

export default App;
