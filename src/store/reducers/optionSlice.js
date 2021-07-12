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
    deleteOption(state, action) {
      const { code } = action.payload;
      state.data = state.data.filter((op) => op.code !== code);
    },
    editOption(state, action) {
      const { code, text, isTrue } = action.payload;
      state.data = state.data.map((op) => {
        if (op.code === code) {
          op.text = text || op.text;
          if(isTrue !== undefined){
            op.isTrue = isTrue;
          }
        }
        return op;
      });
    },
    setSingleCorrect(state, action) {
      const { code, que_id } = action.payload;
      state.data = state.data.map((op) => {
        if (op.que_id === que_id) {
          op.isTrue = op.code === code;
        }
        return op;
      });
    },
    clearOption(state, option) {
      state.count = 0;
      state.data = [];
    },
  },
});

export const optionActions = optionSlice.actions;
export default optionSlice;
