import Box from '@mui/material/Box';
// import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField, { TextFieldVariants } from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

// import { CustomInputProps } from 'src/common.ts';
import useLogin from '../hooks/useLogin.ts';
import StyledSignInForm from './SignInForm.styles.ts';

declare module '@mui/material/TextField' {
  interface TextFieldPropsVariantOverrides {
    lineInput: true;
  }
  // export type ExtendedVariant = TextFieldVariants | 'lineInput';
}

// type ExtendedVariant = TextFieldVariants | 'lineInput';

//   export type TextFieldVariants ='originalVariant1' | 'originalVariant2' | 'yourCustomVariant1' | 'yourCustomVariant2';

const SignInForm = (props) => {
  const { t: localizer } = useTranslation('global');
  const { register, control, togglePw, submit, Controller } = useLogin();

  return (
    <StyledSignInForm>
      <Box sx={{ marginBottom: '1rem' }}>
        <section>
          <InputLabel htmlFor="email-label">
            {localizer('Label_EmailAddress')}
          </InputLabel>
          <Controller
            control={control}
            name="Email Text Field"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField
                // variant={'lineInput' as ExtendedVariant}
                variant="lineInput"
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched/blur
                value={value}
              />
            )}
          />
        </section>

        {/* <TextField
          variant="lineInput"
          sx={{ marginBottom: '0.25rem' }}
          placeholder={localizer('auth.Placeholder_EmailAddress')}
          //   {...register('Email', {
          //     required: localizer('auth.ErrMsg_Email_Required'),
          //     minLength: {
          //       value: 3,
          //       message: localizer('auth.ErrMsg_Email_MinLength'),
          //     },
          //     maxLength: {
          //       value: 320,
          //       message: localizer('auth.ErrMsg_Email_MaxLength'),
          //     },
          //     pattern: {
          //       value:
          //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          //       message: localizer('auth.ErrMsg_Email_Invalid'),
          //     },
          //   })}
        /> */}
      </Box>
    </StyledSignInForm>
  );
};
