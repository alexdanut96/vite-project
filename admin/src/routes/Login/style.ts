import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(10),
  //   [theme.breakpoints.down("sm")]: {
  //     padding: theme.spacing(0, 1, 4),
  //   },
}));

export { StyledBox };
