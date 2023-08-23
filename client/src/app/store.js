import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Auth/userSlice";

//create sotre
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
  devTools: true,
});

export default store;
