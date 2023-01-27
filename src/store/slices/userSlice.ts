import { createSlice } from "@reduxjs/toolkit";

import { User } from "@/models/interfaces/User";

interface initialStateInt {
  user: User | null;
}

const initialState: initialStateInt = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setUser } = userSlice.actions;
