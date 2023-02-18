import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface UserState {
  token: string | null;
}

const initialState: UserState = {
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<UserState["token"]>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
