import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { MuiThemeInterface } from 'src/common';

const DropdownContainer = styled(Box)<MuiThemeInterface>(({ theme }) => ({
  display: 'none',
  paddingRight: '1.5rem',

  [theme.breakpoints.up('md')]: {
    display: 'inline-flex',
  },
}));

export default DropdownContainer;
