import CustomLoader from 'src/components/common/CustomLoader';

import useRegister from '../hooks/useRegister.ts';
import useStepper from '../hooks/useStepper.ts';
import SignUpStepper from './SignUpStepper.tsx';
import StepOne from './StepOne.tsx';
import StepTwo from './StepTwo.tsx';

const SignUpForm = () => {
  const { signup, loading } = useRegister();
  const { step, nextStep } = useStepper();
  let SignUpComponent = null;

  if (step === 0) {
    SignUpComponent = <StepOne />;
  }
  if (step === 1) {
    SignUpComponent = <StepTwo />;
  }
  if (step === 2) {
    SignUpComponent = <div>test3</div>;
  }

  return (
    <>
      {loading && <CustomLoader />}
      <SignUpStepper currentStep={step} />
      {SignUpComponent}
    </>
  );
};

export default SignUpForm;
