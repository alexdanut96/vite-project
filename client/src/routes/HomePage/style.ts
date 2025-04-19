import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const StyleContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  background: theme.palette.custom.gray[200],

  //   [theme.breakpoints.down("sm")]: {
  //     padding: theme.spacing(0, 1, 4),
  //   },
}));

export { StyleContainer };
