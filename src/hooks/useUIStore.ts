import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  onCloseModals,
  onOpenFormModal,
  onOpenCrudModal,
} from "@/store/slices/modalSlice";

export const useUIStore = () => {
  const dispatch = useDispatch();
  const { isEditing, showCrudModal, showFormModal } = useSelector(
    (state: RootState) => state.modalStore
  );

  const setOpenFormModal = (crud: "CREATE" | "EDIT" | "DELETE") => {
    dispatch(onOpenFormModal(crud));
  };
  const setOpenCrudModal = () => {
    dispatch(onOpenCrudModal());
  };
  const setCloseModals = () => {
    dispatch(onCloseModals());
  };
  return {
    isEditing,
    showCrudModal,
    showFormModal,
    setOpenFormModal,
    setOpenCrudModal,
    setCloseModals,
  };
};
