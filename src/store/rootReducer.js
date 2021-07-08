import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./reducers/uiSlice";
import authSlice from "./reducers/authSlice";
import formSlice from "./reducers/formSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    form:formSlice.reducer,
  },
});

export default store;
