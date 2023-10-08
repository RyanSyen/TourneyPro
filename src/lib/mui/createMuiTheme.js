import { createTheme, responsiveFontSizes } from "@mui/material/styles";

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
  },
  typography: {
    fontFamily: "'Noto Sans', sans-serif",
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
};

const createMuiTheme = () => {
  let theme = createTheme(themesOption);
  theme = responsiveFontSizes(theme);

  return theme;
};

export default createMuiTheme;
