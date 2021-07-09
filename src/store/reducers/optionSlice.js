import { createSlice } from "@reduxjs/toolkit";

const optionSlice = createSlice({
  name: "option",
  initialState: {
    count: 0,
    data: [],
  },
  reducers: {
    addOptions(state, action) {
      const { qnr_id, sec_id, blk_id, que_id } = action.payload;
      const id = state.count + 1;
      const code = `OP_${id}`;
      const text = "New option";
      const isTrue = false;
      const option = { id, qnr_id, sec_id, blk_id, que_id, code, text, isTrue };
      state.count = id;
      state.data.push(option);
    },
  },
});

export const optionActions = optionSlice.actions;
export default optionSlice;
