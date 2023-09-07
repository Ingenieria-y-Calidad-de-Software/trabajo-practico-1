import React, { useState, useMemo, useCallback } from "react";
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
  const isLastStep = currentStep === 5;

  const CurrentForm = useMemo(() => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;

      default:
        break;
    }
  }, [currentStep]);

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
            color={isLastStep ? "danger" : "primary"}
            onPress={isLastStep ? undefined : handleForward}
          >
            {isLastStep ? "Pagar" : "Siguiente"}
          </Button>
        </ButtonGroup>
      </div>
    </NextUIProvider>
  );
};

export default App;
