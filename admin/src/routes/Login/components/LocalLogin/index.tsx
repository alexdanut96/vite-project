import { Button, TextField } from "@mui/material";
import { apiEndpoints } from "@script/utils/globalData";
import { Form, StyledBox } from "./style";

const LocalLogin = () => {
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const loginPayload = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };

    const fetchOptions = {
      // endpoint: `${apiEndpoints.authentication}`,
      endpoint: `/api/auth/local`,
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginPayload),
        credentials: "include" as RequestCredentials,
      },
    };

    const response = await fetch(fetchOptions.endpoint, fetchOptions.request);
    console.log(response);
    // const data = await response.json();
  };

  const getUserData = async () => {
    const fetchOptions = {
      // endpoint: `${apiEndpoints.authentication}/status`,
      endpoint: `/api/auth/status`,
      request: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      credentials: "include" as RequestCredentials,
    };

    const response = await fetch(fetchOptions.endpoint, fetchOptions.request);
    const data = await response.json();
    console.log(data);
  };

  const handleLogout = async () => {
    const fetchOptions = {
      endpoint: `${apiEndpoints.authentication}/logout`,
      request: {
        method: "POST",
      },
    };

    const response = await fetch(fetchOptions.endpoint, fetchOptions.request);
    const data = await response.json();
    console.log(data);
  };

  return (
    <StyledBox>
      <Form onSubmit={onSubmit}>
        <TextField size="small" id="email" label="Email" variant="outlined" />
        <TextField
          size="small"
          id="password"
          label="Password"
          variant="outlined"
        />
        <Button variant="outlined" type="submit">
          Login
        </Button>
      </Form>
      <Button variant="contained" onClick={getUserData}>
        Get user data
      </Button>

      <Button variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
    </StyledBox>
  );
};

export { LocalLogin };
