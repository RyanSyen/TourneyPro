import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PublicIcon from '@mui/icons-material/Public';
import SettingsIcon from '@mui/icons-material/Settings';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useTranslation } from 'react-i18next';

import {
  CustomStepIconRoot,
  StepperConnector,
} from './SignUpStepper.styles.ts';

interface ICustomStepIcon {
  active?: boolean;
  completed?: boolean;
  className?: string;
  icon: string;
}

interface IconMap {
  [key: string]: JSX.Element;
}

const CustomStepIcon = (props: ICustomStepIcon) => {
  const { active, completed, className, icon } = props;

  const icons: IconMap = {
    1: <SettingsIcon />,
    2: <AssignmentIndIcon />,
    3: <PublicIcon />,
  };

  return (
    <CustomStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[icon]}
    </CustomStepIconRoot>
  );
};

const SignUpStepper = ({ currentStep }: { currentStep: number }) => {
  const { t: localizer } = useTranslation('global');

  const steps = [
    localizer('Label_Account'),
    localizer('Label_Personal'),
    localizer('Label_Demographic'),
  ];

  // console.log('render stepper 🔥');

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={currentStep}
        connector={<StepperConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

CustomStepIcon.defaultProps = {
  active: false,
  completed: false,
  className: '',
};

export default SignUpStepper;
