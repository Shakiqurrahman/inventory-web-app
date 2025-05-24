import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export type TUserData = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: "ADMIN" | "USER";
  isDeleted?: boolean;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
};

const initialState: {
  user: TUserData | null;
  token: string | null;
} = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logoutUser } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
