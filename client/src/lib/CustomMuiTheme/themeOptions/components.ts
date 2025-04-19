import { ThemeOptions } from "@mui/material";

const components: ThemeOptions["components"] = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        height: "100vh",
        fontWeight: 400,

        "& #root": {
          display: "flex",
          flexDirection: "column",
          height: "100%",
        },

        "&, & #root": {
          position: "relative",
          overflow: "hidden",
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      sizeMedium: ({ theme }) => ({
        padding: theme.spacing(0.5, 2),
      }),
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        fontWeight: "500",
      },
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        fontWeight: "inherit",
        fontSize: "inherit",
        fontFamily: "inherit",
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        "& + *": {
          userSelect: "none",
        },
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        strong: {
          fontWeight: "bold",
        },
        span: {
          fontSize: "inherit",
        },
      },
    },
  },
};

export { components };
