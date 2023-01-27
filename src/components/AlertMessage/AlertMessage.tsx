import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Stack } from "@mui/system";
import { AlertColor } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { onCloseAlertMessage } from "@/store/slices/alertMessageSlice";

export const AlertMessage = () => {
  const dispatch = useDispatch();

  const { showAlertMessage, message, type } = useSelector(
    (state: RootState) => state.alertMessageStore
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(onCloseAlertMessage());
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={showAlertMessage}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={type as AlertColor}
          className="fixed bottom-0 left-0 w-full"
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
