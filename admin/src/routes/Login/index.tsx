import { StyledBox } from "./style";
import { GoogleLogin, LocalLogin } from "./components";

const Login = () => {
  return (
    <StyledBox>
      <LocalLogin />
      <GoogleLogin />
    </StyledBox>
  );
};

export { Login };
