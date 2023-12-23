import styled from '@emotion/styled';
import Box from '@mui/material/Box';

const AuthWrapper = styled(Box)(({ theme }) => {
  // console.log(theme);
  return {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#26282F',
    width: '100%',
    padding: '0 3rem',
    marginTop: '1.5rem',
  };
});

export default AuthWrapper;
