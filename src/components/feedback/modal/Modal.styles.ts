import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Link from '@mui/material/Link';
import { MuiThemeInterface } from 'src/common';

const StyledModal = styled(Dialog)<MuiThemeInterface>(({ theme }) => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 110,
    borderRadius: '1rem',
  };
});

const ContentWrapper = styled(Box)<MuiThemeInterface>({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  maxWidth: '100%',
  width: '32rem',
  backgroundColor: '#26282F',
  padding: '1.25rem',
});

const CloseBtnLink = styled(Link)({
  color: '#8C94A1',

  '&:hover': {
    color: '#FF2D2F',
  },
});

export { CloseBtnLink, ContentWrapper, StyledModal };
