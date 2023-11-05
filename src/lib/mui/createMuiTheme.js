import { createTheme, responsiveFontSizes } from "@mui/material/styles";

//* TODO: Revamp to have better readability by using shared styles as variables
// Refer here: https://mui.com/material-ui/customization/theming/#responsivefontsizes-theme-options-theme

/*
  To expose the theme in the component, do this:
  - import { useTheme } from "@mui/material/styles";
  - const theme = useTheme();
*/

const { palette } = createTheme();

const themesOption = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1025,
      xl: 1280,
    },
  },
  direction: "ltr",
  palette: {
    mode: "dark",
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      main: "rgba(21, 115, 255, 1)",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: "'Noto Sans', sans-serif",
    primary: {
      color: "#FCFCFC",
      hoverColor: "#FF2D2F",
      size: "1rem",
    },
    secondary: {
      color: "#FCFCFC",
      hoverColor: "#C7CBD3",
      size: "0.9rem",
    },
  },
  components: {
    // Name of component
    MuiSelect: {
      // Name of slot
      //! not working. when focus still got background color
      outlined: {
        "&:focus": {
          backgroundColor: "transparent",
        },
      },
      standard: {
        "&:focus": {
          backgroundColor: "transparent",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          backgroundColor: "#26282F",
          // borderRadius: "15px",
        },
        paper: {
          borderRadius: "7px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "#26282F",
          "&.Mui-selected": {
            backgroundColor: "#26282F",
            "&.Mui-focusVisible": {
              background: "#26282F",
            },
            "&:hover": {
              backgroundColor: "#FF2D2F",
            },
          },
          "&:hover": {
            backgroundColor: "#FF2D2F",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          border: "none",
          borderRadius: "1.5rem",
          textTransform: "none",
          fontSize: "1rem",

          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
      variants: [
        {
          props: { variant: "nav" },
          style: {
            padding: "0.4rem 1.5rem",
            background:
              "transparent linear-gradient(116deg, #E50B0D 0%, #CF0868 100%) 0% 0% no-repeat padding-box",
            "&:hover": {
              textDecoration: "none",
              background:
                "transparent linear-gradient(116deg, #c3090c 0%, #b10659 100%) 0% 0% no-repeat padding-box",
              // Reset on touch devices, it doesn't add specificity
              "@media (hover: none)": {
                background:
                  "transparent linear-gradient(116deg, #c3090c 0%, #b10659 100%) 0% 0% no-repeat padding-box",
              },
            },
          },
        },
        {
          props: { variant: "filledPrimaryShort" },
          style: {
            padding: "0.4rem 1.5rem",
            backgroundColor: "#E50B0D",
            width: "fit-content",
            "&:hover": {
              textDecoration: "none",
              backgroundColor: "#C3090C",
              // Reset on touch devices, it doesn't add specificity
              "@media (hover: none)": {
                backgroundColor: "#C3090C",
              },
            },
          },
        },
        {
          props: { variant: "filledPrimary" },
          style: {
            padding: "0.4rem 1.5rem",
            backgroundColor: "#E50B0D",
            width: "100%",
            "&:hover": {
              textDecoration: "none",
              backgroundColor: "#C3090C",
              // Reset on touch devices, it doesn't add specificity
              "@media (hover: none)": {
                backgroundColor: "#C3090C",
              },
            },
          },
        },
      ],
      contained: {
        color: "#fff",
      },
      outlined: {
        "&:hover": {
          backgroundColor: "#35C37D",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          // backgroundColor: "yellow",
          // border: "none",
          // borderRadius: "1.5rem",
        },
      },
      variants: [
        {
          props: { variant: "line-input" },
          style: {
            width: "100%",
            backgroundColor: "transparent",
            "&:hover": {
              textDecoration: "none",
              backgroundColor: "transparent",
              // Reset on touch devices, it doesn't add specificity
              "@media (hover: none)": {
                backgroundColor: "transparent",
              },
            },
            "&.MuiInput-root::after": {
              borderBottom: `2px solid ${"#E50B0D"}`,
            },
            "&.MuiInput-underline .Mui-focused": {
              color: "#E50B0D",
              borderColor: "#E50B0D",
            },
            "&.Mui-focused": {
              "&::after": {
                borderColor: "#E50B0D",
              },
            },
          },
        },
      ],
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#FCFCFC",
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "err-msg" },
          style: {
            display: "flex",
            alignItems: "center",
            color: "#E87C03",
            fontSize: "0.9rem",
            "&::before": {},
          },
        },
      ],
    },
  },
  // custom variables
  border: {
    borderRadius: {
      btnBorder: "1.5rem",
      modal: "1rem",
    },
  },
  padding: {
    signupbtn: "0.4rem 1.5rem",
  },
  background: {
    signupbtn:
      "transparent linear-gradient(116deg, #E50B0D 0%, #CF0868 100%) 0% 0% no-repeat padding-box",
    modal: "#26282F",
    hover: {
      signupbtn:
        "transparent linear-gradient(116deg, #c3090c 0%, #b10659 100%) 0% 0% no-repeat padding-box",
    },
  },
  dropdown: {
    primaryHover: "#FF2D2F",
    secondaryHover: "#c7cbd333",
    hoverCapacity: 1,
    focusBg: "transparent",
  },
};

const createMuiTheme = () => {
  let theme = createTheme(themesOption);
  theme = responsiveFontSizes(theme);

  return theme;
};

export default createMuiTheme;
