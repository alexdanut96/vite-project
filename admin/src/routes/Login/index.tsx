import { StyledBox } from "./style";
import { GoogleButton, GoogleLogin, LocalLogin } from "./components";

const Login = () => {
  return (
    <StyledBox>
      <LocalLogin />
      <GoogleLogin />
      <GoogleButton />
    </StyledBox>
  );
};

export { Login };
