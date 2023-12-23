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

const filledPrimaryFullWidthVariant = {
  props: { variant: 'filledPrimaryFullWidth' },
  style: {
    width: '100%',
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

const filledSecondaryVariant = {
  props: { variant: 'filledSecondary' },
  style: {
    padding: '0.4rem 1.5rem',
    backgroundColor: '#545969',
    width: '100%',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#78749A',
      boxShadow: '3px 3px 10px rgba(120,116,154,0.4)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: '#78749A',
      },
    },
  },
};

const linkVariant = {
  props: { variant: 'link' },
  style: {
    textDecoration: 'none',
    textAlign: 'center',
    fontSize: '.75rem',
    color: '#fcfcfc',
    cursor: 'pointer',
    verticalAlign: 'unset',
    padding: '0 0 0 3px',

    '&:hover': {
      color: '#FF2D2F',
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
  variants: [
    loginVariant,
    filledPrimaryVariant,
    filledSecondaryVariant,
    filledPrimaryFullWidthVariant,
    linkVariant,
  ],
};

export default GlobalButtonStyle;
