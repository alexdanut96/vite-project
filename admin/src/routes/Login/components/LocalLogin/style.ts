import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  //   [theme.breakpoints.down("sm")]: {
  //     padding: theme.spacing(0, 1, 4),
  //   },
}));

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  maxWidth: "300px",
  width: "100%",
}));

export { StyledBox, Form };
