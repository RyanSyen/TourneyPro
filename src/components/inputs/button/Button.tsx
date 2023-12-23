import Button, { ButtonProps } from '@mui/material/Button';

import VisuallyHiddenInput from './Button.styles.ts';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    // insert your custom variants here
    // source: https://v5-0-6.mui.com/customization/theme-components/#adding-new-component-variants

    login: true;
    filledPrimary: true;
    filledPrimaryFullWidth: true;
    link: true;
    filledSecondary: true;
  }
}

interface CustomButtonProps extends ButtonProps {
  isUploadBtn: boolean;
  // text: string;
  ariaControls?: string | undefined;
  ariaHasPopup?:
    | boolean
    | 'dialog'
    | 'menu'
    | 'grid'
    | 'true'
    | 'false'
    | 'listbox'
    | 'tree'
    | undefined;
  ariaExpanded?: boolean | 'true' | 'false' | undefined;
  children: React.ReactNode;
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
    // text,
    disableRipple,
    disableFocusRipple,
    disableTouchRipple,
    ariaControls,
    ariaHasPopup,
    ariaExpanded,
    children,
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
      disableFocusRipple={disableFocusRipple}
      disableRipple={disableRipple}
      disableTouchRipple={disableTouchRipple}
      aria-controls={ariaControls}
      aria-haspopup={ariaHasPopup}
      aria-expanded={ariaExpanded}
    >
      {/* {text} */}
      {children}
      {isUploadBtn && <VisuallyHiddenInput type="file" />}
    </Button>
  );
};

Btn.defaultProps = {
  ariaControls: undefined,
  ariaHasPopup: undefined,
  ariaExpanded: undefined,
};

export default Btn;
