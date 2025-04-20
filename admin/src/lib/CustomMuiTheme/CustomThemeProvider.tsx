import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode } from "@mui/material";

import { palette } from "./themeOptions/palette";

import customTheme from "./theme";

interface CustomThemeProvider {
  children: ReactNode;
}

type ThemeMode = "light" | "dark";

const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const getDesignTokens = (mode: PaletteMode) => ({
  ...customTheme,
  palette: {
    mode,
    ...palette[mode],
  },
});

const themeModeKey = "themeMode";

const CustomThemeProvider = (props: CustomThemeProvider) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const value = localStorage.getItem(themeModeKey);

    if (value) {
      return value as ThemeMode;
    }

    return "light";
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    localStorage.setItem(themeModeKey, mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline>{props.children}</CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export { CustomThemeProvider, ColorModeContext };
