import { createSlice } from "@reduxjs/toolkit";

const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState: ["Home"],
  reducers: {
    Loger: (state) => {
      console.log(state);
    },
    setBreadcrumb: (state, action) => {
      return action.payload; // Replace the breadcrumb state with the new path array
    },
  },
});

export const { loger, setBreadcrumb } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
