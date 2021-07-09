import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    id: null,
    code: null,
    desc: null,
    title: "Untitled questioniere",
    type: 1,
    active: 1,
    bg_color: "#ffffff",
    section_count: 0,
    section: [],
  },
  reducers: {
    editFormData(state, action) {
      state.id = action.payload.id || state.id;
      state.code = action.payload.code || state.code;
      state.desc = action.payload.desc || state.desc;
      state.title = action.payload.title || state.title;
      state.type = action.payload.type || state.type;
      state.active = action.payload.action || state.active;
      state.bg_color = action.payload.bg_color || state.bg_color;
    },
    addNewSection(state, action) {
      if (state.section.length === 0) {
        state.section_count = 0;
      }
      const id = state.section_count + 1;
      const code = `SEC_${id}`;
      const qnr_id = state.id;
      const section = {
        id,
        code,
        qnr_id,
        title: `Untitled section`,
        shuffle_children: 0,
        show_marks: 0,
        active: 1,
        color: "#424242",
        block_count: 0,
        blocks: [],
      };
      state.section_count = id;
      state.section.push(section);
    },
    editSection(state, action) {
      const { code, title } = action.payload;
      const section = state.section.map((sec) => {
        if (sec.code === code) {
          sec.title = title;
        }
        return sec;
      });
      state.section = section;
    },
    deleteSection(state, action) {
      const { code } = action.payload;
      const section = state.section.filter((sec) => sec.code !== code);
      state.section = section;
    },
  },
});

export default formSlice;
export const formActions = formSlice.actions;