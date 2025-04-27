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
      endpoint: `${apiEndpoints.localLogin}`,
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginPayload),
      },
    };

    const response = await fetch(fetchOptions.endpoint, fetchOptions.request);
    const data = await response.json();
    console.log(data);
  };

  const handleTest = async () => {
    const fetchOptions = {
      endpoint: `${apiEndpoints.test}`,
      request: {
        method: "GET",
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
      <Button variant="contained" onClick={handleTest}>
        Test
      </Button>
    </StyledBox>
  );
};

export { LocalLogin };
