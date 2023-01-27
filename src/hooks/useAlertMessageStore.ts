import { useDispatch } from "react-redux";

import { onOpenAlertMessage } from "@/store/slices/alertMessageSlice";

export const useAlertMessageStore = () => {
  const dispatch = useDispatch();

  const showSnackbar = async ({
    message,
    type,
  }: {
    message: string;
    type: string;
  }) => {
    dispatch(onOpenAlertMessage({ message, type }));
  };
  return {
    // * Methods
    showSnackbar,
  };
};
