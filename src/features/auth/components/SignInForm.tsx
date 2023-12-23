import Visibility from '@mui/icons-material/Visibility.js';
import VisibilityOff from '@mui/icons-material/VisibilityOff.js';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
// import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CustomLoader from 'src/components/common/CustomLoader.tsx';
import ErrMsg from 'src/components/common/ErrMsg.tsx';
import Btn from 'src/components/inputs/button/Button.tsx';

import useLogin from '../hooks/useLogin.ts';
import useRegister from '../hooks/useRegister.ts';
import StyledSignInForm from './SignInForm.styles.ts';

const SignInForm = () => {
  const { t: localizer } = useTranslation('global');
  const {
    register,
    togglePw,
    isShowPw,
    submit,
    errors,
    control,
    loading,
    error,
  } = useLogin();
  const { open } = useRegister();

  console.log('loading', loading);

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
    <>
      {loading && <CustomLoader />}
      <StyledSignInForm
        onSubmit={submit}
        control={control as unknown as Control<FieldValues>}
      >
        <Box sx={{ marginBottom: '1rem' }}>
          <InputLabel htmlFor="email-label">
            {localizer('Label_EmailAddress')}
          </InputLabel>
          <TextField
            variant="outlined"
            type="email"
            sx={{ marginBottom: '0.25rem' }}
            placeholder={localizer('Placeholder_EmailAddress')}
            fullWidth
            InputProps={
              {
                // sx: { padding: '8px 0' },
              }
            }
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
            type={isShowPw ? 'text' : 'password'}
            sx={{ marginBottom: '0.25rem' }}
            placeholder={localizer('Placeholder_Password')}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => togglePw()}
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
          {errors?.Password?.type && <ErrMsg>{errors.Password.message}</ErrMsg>}
        </Box>
        <Btn
          variant="filledPrimaryFullWidth"
          disabled={false}
          size="medium"
          isUploadBtn={false}
          type="submit"
        >
          {localizer('Label_SignIn')}
        </Btn>
        {error && (
          <Box sx={{ paddingTop: '12px' }}>
            <ErrMsg>{localizer('ErrMsg_EmailorPassword')}</ErrMsg>
          </Box>
        )}
        <Box className="flex-center" sx={{ paddingTop: '1rem' }}>
          <Typography sx={{ fontSize: '0.75rem', color: '#8C94A1' }}>
            {'No account? '}
            <Btn
              component={Link}
              disableRipple
              disableFocusRipple
              disableTouchRipple
              variant="link"
              disabled={false}
              size="medium"
              isUploadBtn={false}
              type="button"
              onClick={() => {
                open();
              }}
            >
              {localizer('Label_SignUpNow')}
            </Btn>
          </Typography>
        </Box>
      </StyledSignInForm>
    </>
  );
};

export default React.memo(SignInForm);
