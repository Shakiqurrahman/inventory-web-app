import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export type TUserData = {
  userId: string;
  name: string;
  username: string;
  email: string;
  role: "ADMIN" | "USER";
  avatar?: string | null;
};

const initialState: {
  // user: TUserData | null;
  token: string | null;
} = {
  // user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logoutUser: (state) => {
      // state.user = null;
      state.token = null;
    },
  },
});

export const { setToken, logoutUser } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
// export const selectCurrentUser = (state: RootState) => state.auth.user;
