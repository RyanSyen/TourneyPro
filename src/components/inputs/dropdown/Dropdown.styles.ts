import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import { MuiThemeInterface } from 'src/common.ts';

const CustomSelect = styled(Select)<MuiThemeInterface>(({ theme }) => ({
  // boxShadow: 'none',
  // '& .MuiSelect-select:focus': {
  //   backgroundColor: 'transparent',
  // },
  //   '& .MuiSelect-select:hover': {
  //     color: theme.dropdown.primaryHover,
  //   },
  //   '& .MuiSvgIcon-root': {
  //     top: '12%',
  //   },
  //   '&:hover .MuiSvgIcon-root': {
  //     color: theme.dropdown.primaryHover,
  //   },
  //   '& .MuiPaper-root': {
  //     borderRadius: '50px',
  //   },
}));

const TitleComponent = styled(Box)<MuiThemeInterface>(({ theme }) => ({
  display: 'flex',
  fontSize: '1rem',
  gap: '5px',

  [theme.breakpoints.up('md')]: {
    fontSize: '1.15rem',
  },
}));

export { CustomSelect, TitleComponent };
