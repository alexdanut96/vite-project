import { PaletteOptions } from "@mui/material/styles";

const generalPalette: PaletteOptions = {
  primary: {
    main: "#4763FF",
    100: "#90A1FF",
    200: "#364CC6",
  },
  secondary: {
    main: "#1C2331",
    light: "#4A5D84",
    dark: "#4F5767",
  },
  common: {
    white: "#fff",
  },
  success: {
    main: "#2e7d32",
    light: "#72CF78",
    dark: "#1b5e20",
  },
  error: {
    main: "#d32f2f",
    light: "#ef5350",
    dark: "#c62828",
  },
  custom: {
    red: {
      main: "#CC0033",
      100: "#E1444A",
      200: "#F83F46",
    },
    green: {
      main: "#26CB31",
      100: "#72CF78",
    },
    blue: {
      main: "#6EC9E9",
      100: "#4763ff",
      200: "#D3E3FD",
      300: "#c2d9ff",
      400: "#f0f5ff",
      500: "#fdfdff",
    },
    yellow: {
      main: "#FFD600",
      100: "#F3CC00",
    },
    orange: {
      main: "#F39C12",
    },
    gray: {
      main: "#F0F4F9",
      100: "#E7E7E7",
      200: "#D4D4D4",
      300: "#B5B5B5",
      400: "#D9D9D9",
    },
    opacity: {
      main: "rgba(0, 0, 0, 0.1)",
    },
  } as PaletteOptions["custom"],
};

const palette: {
  light: PaletteOptions;
  dark: PaletteOptions;
} = {
  light: {
    ...generalPalette,
    background: {
      default: "#F0F4F9",
    },
    custom: {
      ...generalPalette.custom,
      bodyTextColor: {
        main: "#4A5158",
      },
    } as PaletteOptions["custom"],
  },
  dark: {
    ...generalPalette,
    background: {
      default: "#222",
    },
    custom: {
      ...generalPalette.custom,
      bodyTextColor: {
        main: "#F0F4F9",
      },
    } as PaletteOptions["custom"],
  },
};

export { palette };
