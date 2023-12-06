import WarningIcon from '@mui/icons-material/Warning';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    errMsg: true;
  }
}

const ErrMsg = ({ children }: { children: ReactNode }) => {
  return (
    <Typography variant="errMsg">
      <WarningIcon sx={{ paddingRight: '5px' }} />
      <Typography
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        {children}
      </Typography>
    </Typography>
  );
};

export default ErrMsg;
