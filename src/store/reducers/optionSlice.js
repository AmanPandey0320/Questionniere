import { createSlice } from "@reduxjs/toolkit";

const optionSlice = createSlice({
  name: "option",
  initialState: {
    count: 0,
    data: [],
  },
  reducers: {
    /**
     * adds new option to a question
     * @param {*} state 
     * @param {*} action 
     */
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
    /**
     * deletes an option
     * @param {*} state 
     * @param {*} action 
     */
    deleteOption(state, action) {
      const { code } = action.payload;
      state.data = state.data.filter((op) => op.code !== code);
    },
    /**
     * edits an option
     * @param {*} state 
     * @param {*} action 
     */
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
    /**
     * handle single correct option for a question
     * @param {*} state 
     * @param {*} action 
     */
    setSingleCorrect(state, action) {
      const { code, que_id } = action.payload;
      state.data = state.data.map((op) => {
        if (op.que_id === que_id) {
          op.isTrue = op.code === code;
        }
        return op;
      });
    },
    /**
     * clears the options
     * @param {*} state 
     * @param {*} option 
     */
    clearOption(state, option) {
      state.count = 0;
      state.data = [];
    },
    /**
     * creates full question
     */
     createOption(state,action){
      state.data.push(action.payload.option);
      state.count = action.payload.option.id;
    },
  },
});

export const optionActions = optionSlice.actions;
export default optionSlice;
