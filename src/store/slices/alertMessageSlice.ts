import { createSlice } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";

interface initialStateInt {
  showAlertMessage: boolean;
  message: string;
  type: AlertColor | null;
}

const initialState: initialStateInt = {
  showAlertMessage: false,
  message: "",
  type: "error",
};

export const alertMessageSlice = createSlice({
  name: "alertMessage",
  initialState,
  reducers: {
    onOpenAlertMessage: (state, { payload }) => {
      state.message = payload.message;
      state.type = payload.type;
      state.showAlertMessage = true;
      setTimeout(() => {
        state.showAlertMessage = false;
        state.type = payload.type;
        state.message = "";
      }, 4500);
    },
    onCloseAlertMessage: (state) => {
      state.showAlertMessage = false;
      state.type = "error";
      state.message = "";
    },
  },
});

export const { onOpenAlertMessage, onCloseAlertMessage } =
  alertMessageSlice.actions;
