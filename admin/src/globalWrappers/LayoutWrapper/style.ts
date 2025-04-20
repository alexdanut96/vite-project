import { styled } from "@mui/material/styles";
import { ThemeSwitcher } from "@toolpad/core";

const StyledThemeSwitcher = styled(ThemeSwitcher)(({ theme }) => ({
  background: "red",

  //   "& .MuiContainer-maxWidthLg": {
  //     maxWidth: "100%",
  //   },
}));

export { StyledThemeSwitcher };
