import { Box, Button } from "@mui/material";
import { apiEndpoints } from "@script/utils/globalData";

const Admin = () => {
  const register = async () => {
    const data: { email: string; adminPermission: boolean } = {
      email: "alex.burcea.dev@gmail.com",
      adminPermission: true,
    };
    const fetchOptions = {
      endpoint: `${apiEndpoints.register}`,
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    };

    const response = await fetch(fetchOptions.endpoint, fetchOptions.request);

    const d = await response.json();
    console.log(d);
  };

  return (
    <>
      <Box>Admin page</Box>
      <Button onClick={register}>Register</Button>
    </>
  );
};

export { Admin };
