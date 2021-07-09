import { createSlice } from "@reduxjs/toolkit";

const blockSlice = createSlice({
  name: "block",
  initialState: {
    count: 0,
    data: [],
  },
  reducers: {
    addBlock(state, action) {
      const { qnr_id, sec_id } = action.payload;
      const id = state.count + 1;
      const code = `BLK${id}`;
      const block = {
        id,
        code,
        qnr_id,
        sec_id,
        desc: "This is a block description",
        active: 1,
        shuffle: 0,
        children: [],
      };
      state.count = state.count + 1;
      state.data.push(block);
    },
    deleteBlock(state, action) {
      const { code } = action.payload;
      state.data = state.data.filter((block) => block.code !== code);
    },
    editBlock(state, action) {
      const { code, desc,children } = action.payload;
      const data = state.data.map(block => {
          if(block.code === code){
              block.desc = desc || block.desc;
              block.children = children || block.children;
          }
          return block;
      })
      state.data = data;
    },
  },
});

export const blockActions = blockSlice.actions;
export default blockSlice;
