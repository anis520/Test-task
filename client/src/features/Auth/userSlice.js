import { createSlice } from "@reduxjs/toolkit";
import {
  addSector,
  deleteSector,
  getSector,
  updateSector,
} from "./userapiSlice";

//create auth slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    sectors: [],
    message: "",
    error: "",
  },
  reducers: {
    setMessageEmpty: (state) => {
      (state.message = null), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    // regester
    builder.addCase(addSector.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addSector.fulfilled, (state, action) => {
      (state.loading = false),
        state.sectors.push(action.payload.data.data),
        (state.message = action.payload.data.message);
    });
    builder.addCase(addSector.rejected, (state, action) => {
      (state.message = action.error.message), (state.loading = false);
    });

    builder.addCase(getSector.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSector.fulfilled, (state, action) => {
      (state.loading = false),
        (state.sectors = action.payload.data.data),
        (state.message = action.payload.data.message);
    });
    builder.addCase(getSector.rejected, (state, action) => {
      (state.message = action.error.message), (state.loading = false);
    });
    builder.addCase(deleteSector.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteSector.fulfilled, (state, action) => {
      (state.loading = false), (state.message = action.payload.data.message);
      state.sectors = state.sectors.filter(
        (i) => i._id !== action.payload.data.data._id
      );
    });
    builder.addCase(deleteSector.rejected, (state, action) => {
      (state.message = action.error.message), (state.loading = false);
    });
    builder.addCase(updateSector.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateSector.fulfilled, (state, action) => {
      (state.loading = false), (state.message = action.payload.data.message);
      state.sectors[
        state.sectors.findIndex(
          (data) => data._id === action.payload.data.data._id
        )
      ] = action.payload.data.data;
    });
    builder.addCase(updateSector.rejected, (state, action) => {
      (state.message = action.error.message), (state.loading = false);
    });
  },
});

//export

// selectors
export const getUserData = (state) => state.auth;
// action
export const { setMessageEmpty } = userSlice.actions;
// slice
export default userSlice.reducer;
