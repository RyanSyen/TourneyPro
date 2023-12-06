// import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// import GlobalButtonStyle from './custom/components/inputs/button.ts';
// import MenuTheme from './menu.theme.ts';
// //* TODO: Revamp to have better readability by using shared styles as variables
// // Refer here: https://mui.com/material-ui/customization/theming/#responsivefontsizes-theme-options-theme

// /*
//   To expose the theme in the component, do this:
//   - import { useTheme } from "@mui/material/styles";
//   - const theme = useTheme();
// */

// const themesOption = {
//   breakpoints: {
//     values: {
//       xs: 400,
//       sm: 480,
//       md: 768,
//       lg: 1024,
//       xl: 1200,
//     },
//   },
//   direction: 'ltr',
//   palette: {
//     mode: 'dark',
//     common: {
//       black: '#000',
//       white: '#fff',
//     },
//     primary: {
//       main: 'rgba(21, 115, 255, 1)',
//     },
//     secondary: {
//       main: '#000000',
//     },
//   },
//   typography: {
//     fontFamily: "'Noto Sans', sans-serif",
//     primary: {
//       color: '#FCFCFC',
//       hoverColor: '#FF2D2F',
//       size: '1rem',
//     },
//     secondary: {
//       color: '#FCFCFC',
//       hoverColor: '#C7CBD3',
//       size: '0.9rem',
//     },
//   },
//   components: {
//     // Name of component
//     MuiSelect: {
//       // Name of slot
//       //! not working. when focus still got background color
//       outlined: {
//         backgroundColor: '#fcfcfc',
//         '&:focus': {
//           backgroundColor: 'transparent',
//         },
//       },
//       standard: {
//         '&:focus': {
//           backgroundColor: 'transparent',
//         },
//       },
//       variants: [
//         {
//           props: { variant: 'line-input' },
//           style: {
//             padding: '0.4rem 1.5rem',
//             background:
//               'transparent linear-gradient(116deg, #E50B0D 0%, #CF0868 100%) 0% 0% no-repeat padding-box',
//             '&:hover': {
//               textDecoration: 'none',
//               background:
//                 'transparent linear-gradient(116deg, #c3090c 0%, #b10659 100%) 0% 0% no-repeat padding-box',
//               // Reset on touch devices, it doesn't add specificity
//               '@media (hover: none)': {
//                 background:
//                   'transparent linear-gradient(116deg, #c3090c 0%, #b10659 100%) 0% 0% no-repeat padding-box',
//               },
//             },
//           },
//         },
//       ],
//     },
//     MuiMenu: MenuTheme,
//     MuiMenuItem: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#26282F',
//           '&.Mui-selected': {
//             backgroundColor: '#26282F',
//             '&.Mui-focusVisible': {
//               background: '#26282F',
//             },
//             '&:hover': {
//               backgroundColor: '#FF2D2F',
//             },
//           },
//           '&:hover': {
//             backgroundColor: '#FF2D2F',
//           },
//         },
//       },
//     },
//     MuiButton: GlobalButtonStyle,
//     MuiInput: {
//       styleOverrides: {
//         root: {
//           // backgroundColor: "yellow",
//           // border: "none",
//           // borderRadius: "1.5rem",
//         },
//       },
//       variants: [
//         {
//           props: { variant: 'line-input' },
//           style: {
//             width: '100%',
//             backgroundColor: 'transparent',
//             '&:hover': {
//               textDecoration: 'none',
//               backgroundColor: 'transparent',

//               // Reset on touch devices, it doesn't add specificity
//               '@media (hover: none)': {
//                 backgroundColor: 'transparent',
//               },

//               '&.MuiInput-root::before': {
//                 borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
//               },
//             },
//             '&.MuiInput-root::before': {
//               borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
//             },
//             '&.MuiInput-root::after': {
//               borderBottom: `2px solid ${'#E50B0D'}`,
//             },
//             '&.MuiInput-underline .Mui-focused': {
//               color: '#E50B0D',
//               borderColor: '#E50B0D',
//             },
//             '&.Mui-focused': {
//               '&::after': {
//                 borderColor: '#E50B0D',
//               },
//             },
//           },
//         },
//       ],
//     },
//     MuiInputLabel: {
//       styleOverrides: {
//         root: {
//           color: '#FCFCFC',
//         },
//       },
//     },
//     MuiTypography: {
//       variants: [
//         {
//           props: { variant: 'err-msg' },
//           style: {
//             display: 'flex',
//             alignItems: 'center',
//             color: '#E87C03',
//             fontSize: '0.9rem',
//             '&::before': {},
//           },
//         },
//       ],
//     },
//     MuiLink: {
//       styleOverrides: {
//         root: {
//           textAlign: 'center',
//           fontSize: '.75rem',
//           color: '#fcfcfc',
//           cursor: 'pointer',
//           verticalAlign: 'unset',

//           '&:hover': {
//             color: '#FF2D2F',
//           },
//         },
//       },
//       variants: [
//         {
//           props: { variant: 'no-href' },
//           style: {
//             textDecoration: 'none',
//           },
//         },
//       ],
//     },
//     MuiDialog: {
//       styleOverrides: {
//         paper: {
//           borderRadius: '1rem',
//         },
//       },
//     },
//     // MuiDatePicker: {
//     //   // does not allow global overrides? found a workaround using className to style datepicker
//     // },
//     MuiPickersDay: {
//       styleOverrides: {
//         today: {
//           color: '#FF2D2F',
//         },
//       },
//     },
//     MuiPickersMonth: {
//       styleOverrides: {
//         root: {
//           // color: "#FF2D2F",

//           '&.Mui-selected': {
//             backgroundColor: '#26282F',
//             '&.Mui-focusVisible': {
//               background: '#26282F',
//             },
//             '&:hover': {
//               backgroundColor: '#FF2D2F',
//             },
//           },
//         },
//         monthButton: {
//           '&.Mui-selected': {
//             backgroundColor: '#FF2D2F',
//             '&.Mui-focusVisible': {
//               background: '#FF2D2F',
//             },
//             '&:hover': {
//               backgroundColor: '#FF2D2F',
//             },
//           },
//         },
//       },
//     },
//     MuiPickersYear: {
//       styleOverrides: {
//         today: {
//           color: '#FF2D2F',
//         },
//       },
//     },
//     MuiTab: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none',
//         },
//       },
//       variants: [
//         {
//           props: { variant: 'tabBtn' },
//           style: {
//             padding: '0.4rem 1.5rem',
//             backgroundColor: 'transparent',
//             border: ' 1px solid #fcfcfc',
//             borderRadius: '1.5rem',
//             fontSize: '1rem',
//             marginRight: '1rem',
//             transition:
//               'color .25s ease-in-out,background-color .25s ease-in-out,border-color .25s ease-in-out,box-shadow .25s ease-in-out',

//             '&:hover': {
//               color: '#E50B0D',
//               backgroundColor: '#fcfcfc',
//             },

//             '&.Mui-selected': {
//               textDecoration: 'none',
//               color: '#E50B0D',
//               backgroundColor: '#fcfcfc',
//             },
//           },
//         },
//       ],
//     },
//     MuiBox: {
//       styleOverrides: {
//         root: {},
//       },
//       variants: [
//         {
//           props: { variant: 'customContainer' },
//           style: {
//             padding: '1.5rem',
//             backgroundColor: '#14141B',
//             borderRadius: '1rem',
//           },
//         },
//       ],
//     },
//   },
//   // custom variables
//   border: {
//     borderRadius: {
//       btnBorder: '1.5rem',
//       modal: '1rem',
//     },
//   },
//   padding: {
//     signupbtn: '0.4rem 1.5rem',
//   },
//   background: {
//     signupbtn:
//       'transparent linear-gradient(116deg, #E50B0D 0%, #CF0868 100%) 0% 0% no-repeat padding-box',
//     modal: '#26282F',
//     hover: {
//       signupbtn:
//         'transparent linear-gradient(116deg, #c3090c 0%, #b10659 100%) 0% 0% no-repeat padding-box',
//     },
//   },
//   dropdown: {
//     primaryHover: '#FF2D2F',
//     secondaryHover: '#c7cbd333',
//     hoverCapacity: 1,
//     focusBg: 'transparent',
//   },
// };

// // module augmentation - declare extra properties in the interfaces provided by ts which will be merged with the original declaration
// // mui has pre-defined type declarations, to add extra properties, we need to extend the interface via module augmentation
// // refer here: https://stackoverflow.com/questions/59365396/how-to-use-material-ui-custom-theme-in-react-with-typescript#:~:text=What%20%40kasperoo%20writes%20but%20instead%20make%20it%20more%20generic%20since%20typing%20styles%20is%20way%20to%20much%20work%3A

// const themeName = 'MainTheme';

// const createMuiTheme = () => {
//   const muiTheme = createTheme({ themesOption, themeName });

//   return responsiveFontSizes(muiTheme);
// };

// export default createMuiTheme;
