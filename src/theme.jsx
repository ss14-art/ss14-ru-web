import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, alpha, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ColorModeContext = createContext({
  mode: "light",
  toggleMode: () => {},
});

function buildTheme(mode) {
  const isDark = mode === "dark";

  return createTheme({
    cssVariables: true,
    shape: {
      borderRadius: 20,
    },
    palette: {
      mode,
      primary: {
        main: isDark ? "#b8c4ff" : "#3559b7",
        light: isDark ? "#d9e0ff" : "#dce2ff",
        dark: isDark ? "#8f9dea" : "#17327f",
      },
      secondary: {
        main: isDark ? "#c3c7dc" : "#575f71",
      },
      background: {
        default: isDark ? "#11131a" : "#f6f7fc",
        paper: isDark ? "#1a1d25" : "#ffffff",
      },
      text: {
        primary: isDark ? "#e3e7f2" : "#1b1d24",
        secondary: isDark ? "#b9bfd0" : "#5c6272",
      },
      divider: isDark ? alpha("#dfe3f7", 0.12) : alpha("#2e3445", 0.1),
    },
    typography: {
      fontFamily: "Roboto, system-ui, sans-serif",
      h1: {
        fontWeight: 700,
        letterSpacing: "-0.04em",
      },
      h2: {
        fontWeight: 700,
        letterSpacing: "-0.03em",
      },
      h4: {
        fontWeight: 700,
        letterSpacing: "-0.03em",
      },
      h6: {
        fontWeight: 700,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backdropFilter: "blur(18px)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 18,
            paddingInline: 20,
            minHeight: 42,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 28,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 14,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
    },
  });
}

export function AppThemeProvider({ children }) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDark ? "dark" : "light");

  const theme = useMemo(() => buildTheme(mode), [mode]);
  const value = useMemo(
    () => ({
      mode,
      toggleMode: () => {
        setMode((currentMode) => (currentMode === "light" ? "dark" : "light"));
      },
    }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  return useContext(ColorModeContext);
}
