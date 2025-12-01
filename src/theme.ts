import { createTheme } from "@mui/material/styles";

// Определяем кастомные цвета
export const customColors = {
  grey100: "#F8F8FA",
  grey200: "#E6E3F1", 
  grey300: "#A09CB0",
};

// Стандартные размеры для секций и карточек
export const layout = {
  sectionMaxWidth: 1200,
  sectionPaddingY: { xs: 4, md: 6 },
  sectionPaddingX: { xs: 2, md: 4 },
  cardWidth: { xs: '100%', md: 360 },
  cardMinHeight: 320,
  cardRadius: 24,
  cardGap: 4,
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#754FFF",
      contrastText: "#fff",
    },
    secondary: {
      main: "#F3F0FF",
    },
    background: {
      default: "#F6F7FB", // светло-серый фон сайта
      paper: "#fff",
    },
    text: {
      primary: "#232323",
      secondary: "#754FFF",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: 'Montserrat, Arial, sans-serif',
          background: '#F6F7FB',
          color: '#232323',
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          overflowX: 'hidden',
        },
        '#root': {
          overflowX: 'hidden',
        },
        '*': {
          boxSizing: 'border-box',
          outline: 'none',
        },
        a: {
          color: '#7C5CFA',
          textDecoration: 'none',
          transition: 'color 0.2s',
          '&:hover': {
            color: '#5B4C9D',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: "0 2px 8px 0 rgba(124,92,250,0.07)",
          transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
          fontFamily: 'Montserrat',
          fontWeight: 700,
          fontSize: 16,
          padding: '10px 28px',
          outline: 'none',
          '&:hover': {
            background: "#7C5CFA",
            color: "#fff",
            boxShadow: "0 8px 32px 0 rgba(124,92,250,0.13)",
            transform: "translateY(-2px) scale(1.03)",
          },
          '&:focus-visible': {
            outline: '2.5px solid #7C5CFA',
            outlineOffset: 2,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: "0 4px 24px 0 rgba(124,92,250,0.08)",
          transition: 'box-shadow 0.2s',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: "0 4px 24px 0 rgba(124,92,250,0.10)",
          transition: 'box-shadow 0.2s',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontFamily: 'Montserrat',
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          '& .MuiStepConnector-line': {
            borderColor: '#9163FF',
          },
          '& .MuiStepConnector-active .MuiStepConnector-line': {
            borderColor: '#9163FF',
          },
          '& .MuiStepConnector-completed .MuiStepConnector-line': {
            borderColor: '#9163FF',
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: '#9163FF',
          '&.Mui-active': {
            color: '#9163FF',
          },
          '&.Mui-completed': {
            color: '#9163FF',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#9163FF',
          '&.Mui-checked': {
            color: '#9163FF',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
    h1: {
      fontFamily: 'Montserrat, Arial, sans-serif',
      fontWeight: 500, // Medium
      fontSize: 45,
      color: '#1E1E1E',
      textAlign: 'center',
      marginBottom: 48,
      lineHeight: 1.15,
    },
    h2: {
      fontFamily: 'Montserrat, Arial, sans-serif',
      fontWeight: 500,
      fontSize: 32,
      color: '#1E1E1E',
      textAlign: 'center',
      marginBottom: 48,
      lineHeight: 1.15,
    },
    h3: {
      fontFamily: 'Montserrat, Arial, sans-serif',
      fontWeight: 500,
      fontSize: 45,
      color: '#1E1E1E',
      textAlign: 'center',
      marginBottom: 48,
      lineHeight: 1.15,
    },
    h4: {
      fontFamily: 'Montserrat, Arial, sans-serif',
      fontWeight: 500,
      fontSize: 45,
      color: '#1E1E1E',
      textAlign: 'center',
      marginBottom: 48,
      lineHeight: 1.15,
    },
    h5: {
      fontFamily: 'Montserrat, Arial, sans-serif',
      fontWeight: 500,
      fontSize: 45,
      color: '#1E1E1E',
      textAlign: 'center',
      marginBottom: 48,
      lineHeight: 1.15,
    },
    h6: {
      fontFamily: 'Montserrat, Arial, sans-serif',
      fontWeight: 500,
      fontSize: 24,
      color: '#1E1E1E',
      textAlign: 'center',
      marginBottom: 48,
      lineHeight: 1.15,
    },
    body1: {
      fontFamily: 'Montserrat, Arial, sans-serif',
      fontWeight: 400,
      fontSize: 24,
      color: '#232323',
      lineHeight: 1.4,
    },
    body2: {
      fontFamily: 'Montserrat, Arial, sans-serif',
      fontWeight: 400,
      fontSize: 16,
      color: '#232323',
      lineHeight: 1.4,
    },
    button: {
      fontWeight: 600,
      fontSize: "1rem",
      textTransform: "none",
      letterSpacing: 0.01,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    subtitle2: {
      fontSize: "0.9375rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 24,
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});

export default theme; 