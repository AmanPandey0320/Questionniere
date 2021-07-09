import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    count: 0,
    data: [],
  },
  reducers: {
    addQuestion(state, action) {
      const { qnr_id, blk_id, sec_id } = action.payload;
      const id = state.count + 1;
      const code = `QUE_${id}`;
      const question = {
        id,
        qnr_id,
        sec_id,
        blk_id,
        code,
        active: 1,
        input_type: 1,
        options: [],
        shuffle: 0,
        marks: 0,
        show_marks: 0,
        negative: 0,
        question: "This is a question",
      };
      state.count = id;
      state.data.push(question);
    },
    deleteQuestion(state, action) {
      const { code } = action.payload;
      state.data = state.data.filter((question) => question.code !== code);
    },
    editQuestion(state, action) {
      const { que, code,input } = action.payload;
      state.data.map((question) => {
        if (question.code === code) {
          question.question = que || question.question;
          question.input_type = input || question.input_type;
        }
        return question;
      });
    },
  },
});

export const queActions = questionSlice.actions;
export default questionSlice;
