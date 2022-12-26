import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const cyanTheme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
    },
    error: {
      main: red.A400,
    },
  },
});
