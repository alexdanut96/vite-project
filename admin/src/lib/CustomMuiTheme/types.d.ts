import type {
  ColorPartial,
  SimplePaletteColorOptions,
} from "@mui/material/styles/createPalette";

import type {
  Theme as DefaultTheme,
  ThemeOptions as DefaultThemeOptions,
  Palette as DefaultPalette,
  PaletteOptions as DefaultPaletteOptions,
} from "@mui/material/styles";

type Colors =
  | "red"
  | "green"
  | "blue"
  | "yellow"
  | "orange"
  | "gray"
  | "bodyTextColor"
  | "opacity";
type CustomPaletteOptions = Record<
  Colors,
  SimplePaletteColorOptions & ColorPartial
>;

type BorderSizes = "sm" | "default" | "md" | "lg" | "rounded";
type CustomBorderOptions = Record<BorderSizes, string>;

declare module "@mui/material/styles" {
  interface ShapeOptions {
    custom?: CustomBorderOptions;
  }

  interface Shape {
    custom: CustomBorderOptions;
  }

  interface PaletteOptions extends DefaultPaletteOptions {
    custom?: CustomPaletteOptions;
  }

  interface Palette extends DefaultPalette {
    custom: CustomPaletteOptions;
  }

  interface ThemeOptions extends DefaultThemeOptions {
    shape?: ShapeOptions;
    palette?: PaletteOptions;
  }

  interface Theme extends DefaultTheme {
    shape: Shape;
    palette: Palette;
  }

  // export function createTheme(options?: ThemeOptions): Theme;
}

declare global {
  interface Window {
    google: any;
  }
}
