import { IconButton, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const HeaderSearch = () => {
  return (
    <Stack style={{ alignItems: "center" }} direction="row">
      <TextField
        size="small"
        id="outlined-basic"
        label="Search..."
        variant="outlined"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
      />
    </Stack>
  );
};

export { HeaderSearch };
