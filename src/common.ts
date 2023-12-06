import { InputProps } from '@mui/material/Input';
import { Theme } from '@mui/material/styles';

export interface MuiThemeInterface {
  theme?: Theme;
}

export interface CustomInputProps extends InputProps {
  variant?: 'line-input';
}
