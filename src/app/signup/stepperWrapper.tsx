"use client";

import AccountInfo from "./accountInfo";
import CompleteSignUp from "./completeSignUp";
import Confirmation from "./confirmation";
import Stepper from "./stepper";
import SignUpTerms from "./terms";
import { useForm } from "./useForm";
import UserRole from "./userRole";

const StepperWrapper = () => {
  const { list, step, nextStep, prevStep, formData, onFormSubmit } = useForm();
  let component;

  // console.log("step in stepper wrapper: ", step);

  switch (step) {
    case 1:
      component = <SignUpTerms next={nextStep} />;
      break;
    case 2:
      component = (
        <UserRole
          prev={prevStep}
          next={nextStep}
          formData={formData}
          onSubmitStep={onFormSubmit}
        />
      );
      break;
    case 3:
      component = (
        <AccountInfo
          prev={prevStep}
          next={nextStep}
          formData={formData}
          onSubmitStep={onFormSubmit}
        />
      );
      break;
    case 4:
      component = (
        <Confirmation prev={prevStep} next={nextStep} formData={formData} />
      );
      break;
    case 5:
      component = <CompleteSignUp />;
      break;
    default:
      component = null;
  }

  return (
    <>
      <div className="py-8">
        <Stepper list={list} />
      </div>
      <div>{component}</div>
    </>
  );
};

export default StepperWrapper;
