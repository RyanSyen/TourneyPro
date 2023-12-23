import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import GlobalButtonStyle from './custom/components/inputs/button.ts';
import MenuTheme from './menu.theme.ts';

/*
  cannot use typescript here due to too many customizations

  To expose the theme in the component, do this:
  - import { useTheme } from "@mui/material/styles";
  - const theme = useTheme();
*/

const themesOption = {
  breakpoints: {
    values: {
      xs: 400,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1200,
    },
  },
  direction: 'ltr',
  palette: {
    mode: 'dark',
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      main: 'rgba(21, 115, 255, 1)',
    },
    secondary: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: "'Noto Sans', sans-serif",
    primary: {
      color: '#FCFCFC',
      hoverColor: '#FF2D2F',
      size: '1rem',
    },
    secondary: {
      color: '#FCFCFC',
      hoverColor: '#C7CBD3',
      size: '0.9rem',
    },
  },
  components: {
    // Name of component
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiSelect-select:focus': {
            backgroundColor: 'transparent',
          },
          '& .MuiSelect-select:hover': {
            color: '#FF2D2F',
          },
          // '& .MuiSvgIcon-root': {
          //   top: '12%',
          // },
          '&:hover .MuiSvgIcon-root': {
            color: '#FF2D2F',
          },
        },
      },
      // Name of slot
      //! not working. when focus still got background color
      outlined: {
        backgroundColor: '#fcfcfc',
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
      standard: {
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
      variants: [
        {
          props: { variant: 'line-input' },
          style: {
            padding: '0.4rem 1.5rem',
            background:
              'transparent linear-gradient(116deg, #E50B0D 0%, #CF0868 100%) 0% 0% no-repeat padding-box',
            '&:hover': {
              textDecoration: 'none',
              background:
                'transparent linear-gradient(116deg, #c3090c 0%, #b10659 100%) 0% 0% no-repeat padding-box',
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                background:
                  'transparent linear-gradient(116deg, #c3090c 0%, #b10659 100%) 0% 0% no-repeat padding-box',
              },
            },
          },
        },
      ],
    },
    MuiMenu: MenuTheme,
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: '#26282F',
          '&.Mui-selected': {
            backgroundColor: '#26282F',
            '&.Mui-focusVisible': {
              background: '#26282F',
            },
            '&:hover': {
              backgroundColor: '#FF2D2F',
            },
          },
          '&:hover': {
            backgroundColor: '#FF2D2F',
          },
        },
      },
    },
    MuiButton: GlobalButtonStyle,
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'transparent',
        },
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 0,

          '&:hover': {
            '& fieldset': {
              borderColor: 'transparent !important',
            },

            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
          },

          '& .MuiOutlinedInput-input': {
            padding: '8px 0 0 0',

            '&:-webkit-autofill': {
              WebkitBoxShadow: 'none',
            },
          },

          '& input::placeholder': {
            color: '#777D92',
          },

          '&.Mui-focused': {
            borderColor: '#E50B0D',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
          },
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
          props: { variant: 'line-input' },
          style: {
            width: '100%',
            backgroundColor: 'transparent',
            '&:hover': {
              textDecoration: 'none',
              backgroundColor: 'transparent',

              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                backgroundColor: 'transparent',
              },

              '&.MuiInput-root::before': {
                borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
              },
            },
            '&.MuiInput-root::before': {
              borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            },
            '&.MuiInput-root::after': {
              borderBottom: `2px solid ${'#E50B0D'}`,
            },
            '&.MuiInput-underline .Mui-focused': {
              color: '#E50B0D',
              borderColor: '#E50B0D',
            },
            '&.Mui-focused': {
              '&::after': {
                borderColor: '#E50B0D',
              },
            },
          },
        },
      ],
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#FCFCFC',
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'errMsg' },
          style: {
            display: 'flex',
            alignItems: 'center',
            color: '#E87C03',
            fontSize: '0.9rem',
            '&::before': {},
          },
        },
      ],
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textAlign: 'center',
          fontSize: '.75rem',
          color: '#fcfcfc',
          cursor: 'pointer',
          verticalAlign: 'unset',

          '&:hover': {
            color: '#FF2D2F',
          },
        },
      },
      variants: [
        {
          props: { variant: 'no-href' },
          style: {
            textDecoration: 'none',
          },
        },
      ],
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          // '& .MuiDialog-scrollPaper': {
          //   borderBottom: `2px solid ${'#E50B0D'}`,
          //   height: 'unset',
          //   marginTop: '100px',
          // },
        },

        paper: {
          borderRadius: '1rem',
        },
      },
    },
    // MuiDatePicker: {
    //   // does not allow global overrides? found a workaround using className to style datepicker
    // },
    MuiPickersDay: {
      styleOverrides: {
        today: {
          color: '#FF2D2F',
        },
      },
    },
    MuiPickersMonth: {
      styleOverrides: {
        root: {
          // color: "#FF2D2F",

          '&.Mui-selected': {
            backgroundColor: '#26282F',
            '&.Mui-focusVisible': {
              background: '#26282F',
            },
            '&:hover': {
              backgroundColor: '#FF2D2F',
            },
          },
        },
        monthButton: {
          '&.Mui-selected': {
            backgroundColor: '#FF2D2F',
            '&.Mui-focusVisible': {
              background: '#FF2D2F',
            },
            '&:hover': {
              backgroundColor: '#FF2D2F',
            },
          },
        },
      },
    },
    MuiPickersYear: {
      styleOverrides: {
        today: {
          color: '#FF2D2F',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
      variants: [
        {
          props: { variant: 'tabBtn' },
          style: {
            padding: '0.4rem 1.5rem',
            backgroundColor: 'transparent',
            border: ' 1px solid #fcfcfc',
            borderRadius: '1.5rem',
            fontSize: '1rem',
            marginRight: '1rem',
            transition:
              'color .25s ease-in-out,background-color .25s ease-in-out,border-color .25s ease-in-out,box-shadow .25s ease-in-out',

            '&:hover': {
              color: '#E50B0D',
              backgroundColor: '#fcfcfc',
            },

            '&.Mui-selected': {
              textDecoration: 'none',
              color: '#E50B0D',
              backgroundColor: '#fcfcfc',
            },
          },
        },
      ],
    },
    MuiBox: {
      styleOverrides: {
        root: {},
      },
      variants: [
        {
          props: { variant: 'customContainer' },
          style: {
            padding: '1.5rem',
            backgroundColor: '#14141B',
            borderRadius: '1rem',
          },
        },
      ],
    },
  },
  // custom variables
  border: {
    borderRadius: {
      btnBorder: '1.5rem',
      modal: '1rem',
    },
  },
  padding: {
    signupbtn: '0.4rem 1.5rem',
  },
  background: {
    signupbtn:
      'transparent linear-gradient(116deg, #E50B0D 0%, #CF0868 100%) 0% 0% no-repeat padding-box',
    modal: '#26282F',
    hover: {
      signupbtn:
        'transparent linear-gradient(116deg, #c3090c 0%, #b10659 100%) 0% 0% no-repeat padding-box',
    },
  },
  dropdown: {
    primaryHover: '#FF2D2F',
    secondaryHover: '#c7cbd333',
    hoverCapacity: 1,
    focusBg: 'transparent',
  },
};

const createMuiTheme = () => {
  const muiTheme = createTheme(themesOption);

  return responsiveFontSizes(muiTheme);
};

export default createMuiTheme;
