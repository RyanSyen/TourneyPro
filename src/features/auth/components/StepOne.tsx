import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Control, FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrMsg from 'src/components/common/ErrMsg';
import Btn from 'src/components/inputs/button/Button.tsx';

import useRegister from '../hooks/useRegister.ts';
import useStepper from '../hooks/useStepper.ts';
import StyledSignUpForm from './SignUpForm.styles.ts';

const StepOne = () => {
  const { t: localizer } = useTranslation('global');
  const { formDataRef } = useRegister();
  const {
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      FullName: formDataRef.current.fullName,
      Email: formDataRef.current.emailAddress,
      Password: formDataRef.current.password,
    },
  });

  const { isShowPw, togglePassword, onMouseDown, nextStep } = useStepper();

  console.log('isShowPw', isShowPw);
  console.log('errors', errors);

  // #region register form fields
  const regFullName = register('FullName', {
    required: localizer('ErrMsg_FullName_Required'),
    minLength: {
      value: 3,
      message: localizer('ErrMsg_FullName_MinLength'),
    },
    maxLength: {
      value: 320,
      message: localizer('ErrMsg_FullName_MaxLength'),
    },
  });

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
    minLength: {
      value: 8,
      message: localizer('ErrMsg_Pw_MinLength'),
    },
    maxLength: {
      value: 20,
      message: localizer('ErrMsg_Pw_MaxLength'),
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
      message: 'Minimum 1 uppercase and lowercase characters',
    },
    validate: {
      hasSpecialCharOrNumber: (value) =>
        /^(?=.*[0-9!@#$&*])/.test(value) ||
        localizer('ErrMsg_Pw_NumberorSpecialCharacter'),
    },
  });

  // #endregion

  return (
    <StyledSignUpForm
      control={control as unknown as Control<FieldValues>}
      onSubmit={({ data }) => {
        console.log(data);
        formDataRef.current.fullName = data.FullName;
        formDataRef.current.emailAddress = data.Email;
        formDataRef.current.password = data.Password;
        nextStep();
      }}
    >
      <Box sx={{ marginBottom: '1rem' }}>
        <InputLabel htmlFor="fullname-label">
          {localizer('Label_FullName')}
          <span className="required-star"> *</span>
        </InputLabel>
        <TextField
          variant="outlined"
          type="text"
          sx={{ marginBottom: '0.25rem' }}
          placeholder={localizer('Placeholder_FullName')}
          fullWidth
          onChange={regFullName.onChange}
          onBlur={regFullName.onBlur}
          name={regFullName.name}
          ref={regFullName.ref}
        />
        {errors?.FullName?.type && (
          <ErrMsg>{errors.FullName.message?.toString()}</ErrMsg>
        )}
      </Box>
      <Box sx={{ marginBottom: '1rem' }}>
        <InputLabel htmlFor="email-label">
          {localizer('Label_EmailAddress')}
          <span className="required-star"> *</span>
        </InputLabel>
        <TextField
          variant="outlined"
          type="email"
          sx={{ marginBottom: '0.25rem' }}
          placeholder={localizer('Placeholder_EmailAddress')}
          fullWidth
          onChange={regEmail.onChange}
          onBlur={regEmail.onBlur}
          name={regEmail.name}
          ref={regEmail.ref}
        />
        {errors?.Email?.type && <ErrMsg>{errors.Email.message}</ErrMsg>}
      </Box>
      <Box sx={{ marginBottom: '1rem' }}>
        <InputLabel htmlFor="password-label">
          {localizer('Label_Password')}
          <span className="required-star"> *</span>
        </InputLabel>
        <TextField
          variant="outlined"
          type={isShowPw ? 'text' : 'password'}
          sx={{ marginBottom: '0.25rem' }}
          placeholder={localizer('Placeholder_Password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  component="span"
                  aria-label="toggle password visibility"
                  onClick={() => togglePassword()}
                  onMouseDown={(e) => onMouseDown(e)}
                  edge="end"
                >
                  {isShowPw ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
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
        // onClick={() => nextStep()}
      >
        {localizer('Label_Continue')}
      </Btn>
    </StyledSignUpForm>
  );
};

export default React.memo(StepOne);
