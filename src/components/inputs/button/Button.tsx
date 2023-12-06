import Button, { ButtonProps } from '@mui/material/Button';

import VisuallyHiddenInput from './Button.styles.ts';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    // insert your custom variants here
    // source: https://v5-0-6.mui.com/customization/theme-components/#adding-new-component-variants
    filledPrimary: true;
    login: true;
  }
}

interface CustomButtonProps extends ButtonProps {
  isUploadBtn: boolean;
  text: string;
}

const Btn = (props: CustomButtonProps) => {
  const {
    variant,
    disabled,
    onClick,
    size,
    startIcon,
    endIcon,
    type,
    isUploadBtn,
    text,
  } = props;
  return (
    <Button
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      type={type}
      disableElevation={false}
      disableFocusRipple={false}
      disableRipple={false}
    >
      {text}
      {isUploadBtn && <VisuallyHiddenInput type="file" />}
    </Button>
  );
};

export default Btn;
