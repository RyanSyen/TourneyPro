const loginVariant = {
  props: { variant: 'login' },
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
};

const filledPrimaryVariant = {
  props: { variant: 'filledPrimary' },
  style: {
    padding: '0.4rem 1.5rem',
    backgroundColor: '#E50B0D',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#C3090C',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: '#C3090C',
      },
    },
  },
};

const GlobalButtonStyle = {
  styleOverrides: {
    root: {
      border: 'none',
      borderRadius: '1.5rem',
      textTransform: 'none',
      fontSize: '1rem',

      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  variants: [loginVariant, filledPrimaryVariant],
};

export default GlobalButtonStyle;
