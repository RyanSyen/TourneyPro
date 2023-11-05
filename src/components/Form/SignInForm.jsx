import styled from "@emotion/styled";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Form, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { auth } from "../../lib/firebase/auth";
import Btn from "../Button/Button";
import CustomLoader from "../Common/CustomLoader";
import ErrMsg from "../Common/ErrMsg";

const metadata = {
  // email: {
  //   placholder: "Enter email address",
  //   requiredErr: "Email is required.",
  //   minLength: 5,
  //   minLengthErr: "Email must be more than 5 characters.",
  //   maxLength: 100,
  //   maxLengthErr: "Email must not exceed more than 100 characters",
  //   pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  //   patternErr: "Invalid email address.",
  // },
  email: {
    required: "Email is required",
    minLength: {
      value: 5,
      message: "Email must be more than 3 characters",
    },
    maxLength: {
      value: 100,
      message: "Email must not exceed more than 100 characters",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Invalid email address",
    },
  },
  password: {
    placholder: "Enter password",
    requiredErr: "Email is required.",
    regexErr: [
      "Password must consist at least:",
      "1 Uppercase Character",
      "1 Lowercase Character",
      "1 Digit",
      "1 Special Character",
      "Minimum length of 8",
    ],
  },
};

const btnProp = {
  variant: "filledPrimary",
  disabled: false,
  size: "medium",
  startIcon: <></>,
  endIcon: <></>,
  isUploadBtn: false,
  type: "submit",
};

const StyledSignInForm = styled(Form)(({ theme }) => {
  return {
    width: "100%",
  };
});

const SignInForm = () => {
  const { t: localizer } = useTranslation("global");
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const onSubmit = async (data) => {
    signInWithEmailAndPassword(data.Email, data.Password);
  };

  return (
    <>
      {loading && <CustomLoader />}
      <StyledSignInForm control={control} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ marginBottom: "1rem" }}>
          <InputLabel htmlFor="email-label">Email Address</InputLabel>
          <Input
            variant="line-input"
            sx={{ marginBottom: "0.25rem" }}
            // placeholder={metadata.email.placeholder}
            placeholder="Enter email"
            {...register("Email", {
              required: "Email is required",
              minLength: {
                value: 5,
                message: "Email must be more than 3 characters",
              },
              maxLength: {
                value: 100,
                message: "Email must not exceed more than 100 characters",
              },
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors?.Email?.type && <ErrMsg>{errors.Email.message}</ErrMsg>}
        </Box>
        <Box sx={{ marginBottom: "1rem" }}>
          <InputLabel htmlFor="password-label">Password</InputLabel>
          <Input
            variant="line-input"
            sx={{ marginBottom: "0.25rem" }}
            type={showPassword ? "text" : "password"}
            // placeholder={`${metadata.password.placeholder}`}
            // placeholder={metadata.password.placeholder} // not sure why not working
            placeholder="Enter password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            {...register("Password", {
              required: "Password is required",
            })}
          />
          {errors?.Password?.type && <ErrMsg>{errors.Password.message}</ErrMsg>}
        </Box>
        <Btn el={btnProp} text={localizer("header.label_signin")} />
        {error && (
          <Box sx={{ paddingTop: "12px" }}>
            <ErrMsg>{"Email or password is invalid. Please try again"}</ErrMsg>
          </Box>
        )}
      </StyledSignInForm>
    </>
  );
};

export default SignInForm;
