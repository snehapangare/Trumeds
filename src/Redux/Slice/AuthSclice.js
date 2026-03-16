import { createSlice } from "@reduxjs/toolkit";
import { getAccessToken } from "../../utils/helper";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthinticated: !!getAccessToken()
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    authSucess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthinticated = true;
    },

    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logOut: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isAuthinticated = false;
    }
  }
});

export const { authFailure, authStart, authSucess, logOut } = AuthSlice.actions;
export default AuthSlice.reducer;