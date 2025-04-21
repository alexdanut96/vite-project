import { Box, Button } from "@mui/material";
import { apiEndpoints } from "@script/utils/globalData";

const Login = () => {
  const navigate = (url: string) => {
    window.location.href = url;
  };

  const loginWithGoogle = async () => {
    const fetchOptions = {
      endpoint: `${apiEndpoints.googleLogin}`,
      request: {
        method: "POST",
      },
    };

    const response = await fetch(fetchOptions.endpoint, fetchOptions.request);
    const data = await response.json();
    console.log(response);
    navigate(data.url);
  };

  return (
    <>
      <Box>Login page</Box>
      <Button
        onClick={() => loginWithGoogle()}
        sx={{ width: "fit-content" }}
        variant="outlined"
      >
        Login with google
      </Button>
    </>
  );
};

export { Login };
