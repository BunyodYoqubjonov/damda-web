import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    common: {
      black: '#000',
      green: '#16AA16',
      yellow: '#F2C31D',
      red: '#DE2F2F',
    },
    primary: {
      main: '#F19204',
      border: '#D2D2D7',
    },
    secondary: {
      main: '#8B949F',
    },
    background: {
      main: '#FFF',
      grey: '#ECEFF3',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          whiteSpace: 'nowrap',
        },
        fullWidth: {
          width: '100%',
        },
        outlined: {
          height: 46,
          padding: '14px 24px',
          borderColor: '#000',
          borderRadius: 12,
          textTransform: 'none',
          fontFamily: '"TT Commons", sans-serif',
          fontWeight: 400,
          fontSize: 18,
          lineHeight: '21px',
          color: 'inherit',
          letterSpacing: '-0.02em',
          transition: '.2s ease-in-out',
          '&:hover': {
            backgroundColor: '#FFF',
          },
          '@media (max-width: 576px)': {
            fontSize: 16,
            lineHeight: '18px',
          },
        },
        contained: {
          height: 46,
          padding: '14px 50px',
          textTransform: 'none',
          color: '#FFF',
          borderRadius: 12,
          fontFamily: '"TT Commons", sans-serif',
          fontWeight: 400,
          fontSize: 16,
          lineHeight: '18px',
          letterSpacing: '-0.02em',
          transition: '.2s ease-in-out',
          boxShadow: 'none',
          '&:hover': {
            opacity: 0.8,
            backgroundColor: '#F19204',
            boxShadow: 'none',
          },
        },
        text: {
          color: '#338EFF',
          textTransform: 'none',
          textDecoration: 'underline',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        sizeLarge: {
          height: 60,
          padding: 20,
          fontSize: 18,
          lineHeight: '21px',
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width:600px)': {
            paddingLeft: 15,
            paddingRight: 15,
          },
          '@media (min-width:1200px)': {
            maxWidth: '1140px',
          },
          // '@media (min-width:1536px)': {
          //   maxWidth: '100%',
          // },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {},
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {},
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {},
        arrow: {},
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: '12px 20px',
          textTransform: 'none',
          fontSize: 20,
          lineHeight: '24px',
          fontFamily: '"TT Commons", sans-serif',
          fontWeight: 400,
          color: '#00000080',
          '&.Mui-selected': {
            color: '#000',
            borderColor: '#000',
          },
          '@media (max-width: 900px)': {
            fontSize: 16,
            lineHeight: '25px',
            padding: 8,
          },
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          zIndex: 999,
        },
        container: {
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          maxWidth: 1440,
        },
        paper: {
          padding: '50px 60px',
          borderRadius: 12,
          boxShadow: '0px 4px 200px rgba(168, 167, 165, 0.35)',
          maxWidth: 700,
          '@media (max-width: 576px)': {
            padding: 30,
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          display: 'inline-block',
          width: 'auto',
          padding: 0,
          paddingBottom: 8,
          borderBottom: '2px solid #000000',
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: '#000',
          whiteSpace: 'nowrap',
          lineHeight: '35px',
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: '0px 4px 200px rgba(168, 167, 165, 0.35)',
          borderRadius: 12,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          // padding: '20px 0',
          // border: '1px solid #D2D2D7',
          // borderRadius: 12,
          // marginBottom: 10,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {},
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:hover:not(.Mui-disabled)': {
            borderBottom: 'transparent',
          },
          '&:before': {
            borderBottom: '1px solid #E4E4E4 !important',
          },
          '&:after': {
            borderBottom: '1px solid #000',
          },
        },
        input: {
          fontSize: 20,
          lineHeight: '24px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 20,
          lineHeight: '24px',
          color: '#000',
          '&.Mui-focused': {
            color: '#000',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        scroller: {
          '@media (max-width: 900px)': {
            overflow: 'auto !important',
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          minWidth: 60,
          height: 60,
          borderRadius: 12,
          borderColor: '#D2D2D7',
          fontSize: 20,
          fontWeight: 500,
          lineHeight: '23px',
          color: '#000',
          margin: '0 5px',
          padding: 20,
          verticalAlign: 'baseline',
          '&.Mui-selected, &:hover': {
            backgroundColor: 'transparent',
            borderColor: '#F19204',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
        },
        ellipsis: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        sizeSmall: {
          minWidth: 30,
          height: 30,
          fontSize: 14,
          lineHeight: '17px',
          margin: '0 4px',
          padding: 6,
          borderRadius: 8,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
  },
  typography: {
    h1: {
      fontSize: 24,
      lineHeight: '30px',
      letterSpacing: '-0.02em',
      fontFamily: '"TT Commons", sans-serif',
      fontWeight: 400,
      '@media (max-width: 900px)': {
        fontSize: 20,
        lineHeight: '30px',
      },
    },
    h2: {
      fontSize: 24,
      lineHeight: '28px',
      letterSpacing: '-0.02em',
      fontFamily: '"TT Commons", sans-serif',
      fontWeight: 400,
    },
    h3: {
      fontSize: 40,
      lineHeight: '46px',
      letterSpacing: '-0.02em',
      fontFamily: '"TT Commons", sans-serif',
      fontWeight: 500,
    },
    h4: {
      fontSize: 32,
      lineHeight: '37px',
      letterSpacing: '-0.02em',
      fontFamily: '"TT Commons", sans-serif',
      fontWeight: 500,
      '@media (max-width: 900px)': {
        fontSize: 28,
        lineHeight: '33px',
      },
    },
    h5: {},
    h6: {
      fontSize: 28,
      lineHeight: '33px',
      fontWeight: 500,
      fontFamily: '"TT Commons", sans-serif',
      letterSpacing: '-0.02em',
      '@media (max-width: 900px)': {
        fontSize: 20,
        lineHeight: '24px',
      },
    },
    subtitle1: {},
    subtitle2: {},
    body1: {
      fontWeight: 400,
      fontSize: 18,
      lineHeight: '21px',
      fontFamily: '"TT Commons", sans-serif',
      color: 'inherit',
      letterSpacing: '-0.02em',
      '@media (max-width: 576px)': {
        fontSize: 16,
        lineHeight: '18px',
      },
    },
    body2: {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '18px',
      fontFamily: '"TT Commons", sans-serif',
      color: 'inherit',
      letterSpacing: '-0.02em',
      '@media (max-width: 576px)': {
        fontSize: 14,
        lineHeight: '16px',
      },
    },
    button: {},
    caption: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '16px',
      fontFamily: '"TT Commons", sans-serif',
      color: 'inherit',
      letterSpacing: '-0.02em',
      margin: 0,
      '@media (max-width: 576px)': {
        fontSize: 12,
        lineHeight: '14px',
      },
    },
    overline: {},
  },
  props: {
    MuiButton: {
      variant: 'contained',
    },
  },
})

export default lightTheme
