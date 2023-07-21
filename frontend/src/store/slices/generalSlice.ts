import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface generalState {
  showSuccess: boolean;
}

const initialState: generalState = {
  showSuccess: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setShowSuccess (state, action: PayloadAction<boolean>) {
      state.showSuccess = action.payload
    }
  },
});

// eslint-disable-next-line no-empty-pattern
export const { setShowSuccess } = generalSlice.actions;
export const generalSelector = (store: RootState) => store.general;
export default generalSlice.reducer;