import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    drop: false,
    notification: {
      text: '',
      severity: "info",
      show:false,
    },
  },
  reducers: {
    toggleDrop(state, action) {
      state.drop = !state.drop;
    },
    sendNotification(state, action) {
      const { text, severity, show } = action.payload;
      state.notification = {
        text,
        severity,
        show,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
