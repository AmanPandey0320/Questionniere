import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./reducers/uiSlice";
import authSlice from "./reducers/authSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
