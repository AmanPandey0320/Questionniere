import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    id: null,
    code: null,
    desc: '',
    title: "Untitled questioniere",
    type: 0,
    active: 1,
    section_count: 0,
    created_at:undefined,
    last_edited:undefined,
    total_marks:0,
    passing_marks:0,
    show_marks:false,
    shuffle_section:false,
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
      state.last_edited = Date.now();
      state.created_at = state.created_at || Date.now();
      state.total_marks = action.payload.total_marks || state.total_marks;
      state.passing_marks = action.payload.passing_marks || state.passing_marks;
      if(action.payload.show_marks !== undefined){
        state.show_marks = action.payload.show_marks;
      }
      if(action.payload.type !== undefined ){
        state.type = action.payload.type;
      }
      if(action.payload.shuffle_section !== undefined ){
        state.shuffle_section = action.payload.shuffle_section;
      }
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
        color:'#2196f3',
        block_count: 0,
        blocks: [],
      };
      state.section_count = id;
      state.section.push(section);
    },
    editSection(state, action) {
      const { code, title,blocks,color,shuffle_children } = action.payload;
      const section = state.section.map((sec) => {
        if (sec.code === code) {
          sec.title = title || sec.title;
          sec.blocks = blocks || sec.blocks;
          sec.color = color || sec.color;
          if(shuffle_children !== undefined){
            sec.shuffle_children = shuffle_children;
          }
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
    clearForm(state,action){
      state.id = null;
      state.code = null;
      state.section = [];
      state.section_count=0;
      state.title="Untitled";
      state.desc= "None"
    }
  },
});

export default formSlice;
export const formActions = formSlice.actions;
