import { ThemeOptions } from "@mui/material/styles";

const fonts = {
  heading: '"Montserrat"',
  body: '"Open Sans"',
};

const headingsStyle = {
  fontFamily: `${fonts.heading}, sans-serif`,
  fontWeight: 500,
};

const typography: ThemeOptions["typography"] = (palette) => ({
  fontFamily: [`${fonts.heading}`, `${fonts.body}`, "sans-serif"].join(", "),
  body1: {
    fontFamily: `${fonts.body}, sans-serif`,
    fontSize: "1rem",
    lineHeight: 1.5,
    color: palette.custom.bodyTextColor.main,
    fontWeight: "inherit",
  },
  h1: {
    ...headingsStyle,
    fontSize: "1.25rem",
  },
  h2: {
    ...headingsStyle,
    fontSize: "1.2rem",
  },
  h3: {
    ...headingsStyle,
    fontSize: "1.15rem",
  },
  h4: {
    ...headingsStyle,
    fontSize: "1.1rem",
  },
});

export { typography };
