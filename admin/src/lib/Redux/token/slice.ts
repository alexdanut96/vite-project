import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface TokenState {
  value: string | undefined;
}

const initialState: TokenState = {
  value: undefined,
};

const tokenSlice = createSlice({
  name: "tokenData",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    removeToken(state) {
      state.value = undefined;
    },
  },
});

const persistedToken = persistReducer(
  {
    key: "token",
    version: 1,
    storage,
  },
  tokenSlice.reducer
);

export const { setToken, removeToken } = tokenSlice.actions;
export default persistedToken;
