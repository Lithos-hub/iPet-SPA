import { createSlice } from "@reduxjs/toolkit";
import { CrudOperation } from "@/models/types/CrudOperation";

interface initialStateInt {
  isEditing: boolean;
  showFormModal: boolean;
  showCrudModal: boolean;
  crud: CrudOperation;
}

const initialState: initialStateInt = {
  isEditing: false,
  showFormModal: false,
  showCrudModal: false,
  crud: undefined,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpenFormModal: (state, { payload }) => {
      state.isEditing = payload === "EDIT" ? true : false;
      state.crud = payload;
      state.showFormModal = true;
    },
    onOpenCrudModal: (state) => {
      state.showCrudModal = true;
    },
    onCloseModals: (state) => {
      state.isEditing = false;
      state.showFormModal = false;
      state.showCrudModal = false;
    },
  },
});

export const { onOpenFormModal, onOpenCrudModal, onCloseModals } =
  modalSlice.actions;
