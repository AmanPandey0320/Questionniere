import { createSlice } from "@reduxjs/toolkit";

const blockSlice = createSlice({
  name: "block",
  initialState: {
    count: 0,
    data: [],
  },
  reducers: {
    /**
     * adds a new block
     * @param {*} state
     * @param {*} action
     */
    addBlock(state, action) {
      const { qnr_id, sec_id, color } = action.payload;
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
        color: color,
        children: [],
      };
      state.count = state.count + 1;
      state.data.push(block);
    },

    /**
     * delets a block
     * @param {*} state
     * @param {*} action
     */
    deleteBlock(state, action) {
      const { code } = action.payload;
      state.data = state.data.filter((block) => block.code !== code);
    },

    /**
     * edits a block on basis of block code
     * @param {*} state
     * @param {*} action
     */
    editBlock(state, action) {
      const { code, desc, children, color, sec_id, shuffle } = action.payload;
      const data = state.data.map((block) => {
        if (block.code === code) {
          block.desc = desc || block.desc;
          block.children = children || block.children;
          if (shuffle !== undefined) {
            block.shuffle = shuffle;
          }
        }
        if (block.sec_id === sec_id) {
          block.color = color || block.color;
        }
        return block;
      });
      state.data = data;
    },

    /**
     * clears block
     * @param {*} state
     * @param {*} action
     */
    clearBlocks(state, action) {
      state.count = 0;
      state.data = [];
    },
    /**
     * creates full block
     */
    createBlock(state,action){
      state.data.push(action.payload.block);
      state.count = action.payload.block.id;
    },

  },
});

export const blockActions = blockSlice.actions;
export default blockSlice;
