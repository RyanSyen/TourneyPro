import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import {
  background_primary_color,
  body_background_color,
  primary_font_size,
  secondary_font_size,
  typography_error_color,
  typography_primary_color,
  typography_primary_hover_color,
} from "../../customStyles";
//! will not utilize create mui theme as there's not enough customizations, will override mui component styles
// Refer here: https://mui.com/material-ui/customization/theming/#responsivefontsizes-theme-options-theme

// h1: 96px
// h2: 60px
// h3: 48px
// h4: 34px
// h5: 24px
// subtitle1: 16px
// subtitle2: 14px
// body1: 16px
// body2: 14px
// button: 14px
// caption: 12px
// overline: 12px

/*
  To expose the theme in the component, do this:
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
  // components: "", // override mui components styles here e.g. muialert
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
    // signup: palette.augmentColor({
    //   color: {
    //     main: "transparent linear-gradient(116deg, #E50B0D 0%, #CF0868 100%) 0% 0% no-repeat padding-box",
    //   },
    // }),
    action: {
      hover: typography_primary_hover_color,
      hoverCapacity: 1,
      focus: "transparent",
    },
  },
  typography: {
    fontFamily: "'Noto Sans', sans-serif",
    button: {
      textTransform: "none",
      fontSize: primary_font_size,
    },
    // h4: {
    //   color: "rgba(0,0,0,0.7)",
    //   letterSpacing: " 0.25px",
    //   fontWeight: 700,
    // },
    // h5: {
    //   color: "rgba(0,0,0,0.6)",
    //   fontWeight: 400,
    // },
    // subtitle1: {
    //   color: "rgba(0,0,0,0.7)",
    //   letterSpacing: " 0.25px",
    // },
    // body2: {
    //   color: "rgba(55, 65, 81, 1)",
    //   fontWeight: 400,
    // },
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
          backgroundColor: body_background_color,
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
          backgroundColor: body_background_color,
          "&.Mui-selected": {
            backgroundColor: body_background_color,
            "&.Mui-focusVisible": {
              background: body_background_color,
            },
            "&:hover": {
              backgroundColor: typography_primary_hover_color,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          border: "none",
          borderRadius: "1.5rem",
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
          props: { variant: "filledPrimary" },
          style: {
            padding: "0.4rem 1.5rem",
            backgroundColor: background_primary_color,
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
              borderBottom: `2px solid ${background_primary_color}`,
            },
            "&.MuiInput-underline .Mui-focused": {
              color: background_primary_color,
              borderColor: background_primary_color,
            },
            "&.Mui-focused": {
              // color: background_primary_color,
              "&::after": {
                borderColor: background_primary_color,
              },
            },
          },
        },
      ],
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: typography_primary_color,
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
            color: typography_error_color,
            fontSize: secondary_font_size,
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
    modal: body_background_color,
    hover: {
      signupbtn:
        "transparent linear-gradient(116deg, #c3090c 0%, #b10659 100%) 0% 0% no-repeat padding-box",
    },
  },
};

const createMuiTheme = () => {
  let theme = createTheme(themesOption);
  theme = responsiveFontSizes(theme);

  return theme;
};

export default createMuiTheme;
