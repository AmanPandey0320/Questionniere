import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./reducers/uiSlice";
import authSlice from "./reducers/authSlice";
import formSlice from "./reducers/formSlice";
import blockSlice from "./reducers/blockSlice";
import questionSlice from "./reducers/queSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    form: formSlice.reducer,
    block: blockSlice.reducer,
    question: questionSlice.reducer,
  },
});

export default store;
