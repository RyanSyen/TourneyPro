import Visibility from '@mui/icons-material/Visibility.js';
import VisibilityOff from '@mui/icons-material/VisibilityOff.js';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import ErrMsg from 'src/components/common/ErrMsg.tsx';

import useLogin from '../hooks/useLogin.ts';
import StyledSignInForm from './SignInForm.styles.ts';

const SignInForm = () => {
  const { t: localizer } = useTranslation('global');
  const { register, togglePw, isShowPw, submit, errors, handleSubmit } =
    useLogin();

  // register form fields
  const regEmail = register('Email', {
    required: localizer('ErrMsg_Email_Required'),
    minLength: {
      value: 3,
      message: localizer('ErrMsg_Email_MinLength'),
    },
    maxLength: {
      value: 320,
      message: localizer('ErrMsg_Email_MaxLength'),
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: localizer('ErrMsg_Email_Invalid'),
    },
  });
  const regPassword = register('Password', {
    required: localizer('ErrMsg_Pw_Required'),
  });

  return (
    <StyledSignInForm onSubmit={() => handleSubmit(submit)}>
      <Box sx={{ marginBottom: '1rem' }}>
        <InputLabel htmlFor="email-label">
          {localizer('Label_EmailAddress')}
        </InputLabel>
        <TextField
          variant="outlined"
          sx={{ marginBottom: '0.25rem' }}
          placeholder={localizer('Placeholder_EmailAddress')}
          onChange={regEmail.onChange}
          onBlur={regEmail.onBlur}
          name={regEmail.name}
          ref={regEmail.ref}
        />
        {errors?.Email?.type && (
          <ErrMsg>{errors.Email.message?.toString()}</ErrMsg>
        )}
      </Box>
      <Box sx={{ marginBottom: '1rem' }}>
        <InputLabel htmlFor="password-label">
          {localizer('Label_Password')}
        </InputLabel>
        <TextField
          variant="outlined"
          sx={{ marginBottom: '0.25rem' }}
          placeholder={localizer('Placeholder_Password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => togglePw}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {isShowPw ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={regPassword.onChange}
          onBlur={regPassword.onBlur}
          name={regPassword.name}
          ref={regPassword.ref}
        />
      </Box>
    </StyledSignInForm>
  );
};

export default SignInForm;
