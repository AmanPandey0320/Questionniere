import { createSlice } from "@reduxjs/toolkit";
import { setType } from './Reducers/questionReducer'

const questionSlice = createSlice({
  name: "question",
  initialState: {
    count: 0,
    data: [],
  },
  reducers: {
    setType,
    /**
     * adds new question
     * @param {*} state 
     * @param {*} action 
     */
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
        input_type: 0,
        options: [],
        shuffle: 0,
        marks: 0,
        show_marks: 0,
        negative: 0,
        require: 0,
        question: "This is a question",
        valid: true,
        width:100,
        marginL:0,
        marginR:0,
        marginT:0,
        marginB:0,
        paddingL:0,
        paddingR:0,
        paddingT:0,
        paddingB:0,
      };
      state.count = id;
      state.data.push(question);
    },

    /**
     * deletes new question
     * @param {*} state 
     * @param {*} action 
     */
    deleteQuestion(state, action) {
      const { code } = action.payload;
      state.data = state.data.filter((question) => question.code !== code);
    },
    /**
     * edits a question on the basis of code
     * @param {*} state 
     * @param {*} action 
     */
    editQuestion(state, action) {
      const {
        que,
        code,
        input,
        showMarks,
        negative,
        marks,
        require,
        options,
        valid,
        id,
        width,
        marginB,
        marginL,
        marginR,
        marginT,
        paddingL,
        paddingR,
        paddingT,
        paddingB,
        shuffle,
      } = action.payload;
      state.data.map((question) => {
        if (question.code === code || question.id === id) {
          question.question = que || question.question;
          question.input_type = input || question.input_type;
          question.show_marks = showMarks || question.show_marks;
          question.marks = marks || question.marks;
          question.negative = negative || question.negative;
          question.require = require || question.require;
          question.options = options || question.options;
          if (valid !== undefined) {
            question.valid = valid;
          }
          if(width !== undefined){
            question.width = width;
          }

          // setting margin 
          
          if(marginL !== undefined){
            question.marginL = marginL;
          }
          if(marginR !== undefined){
            question.marginR = marginR;
          }
          if(marginT !== undefined){
            question.marginT = marginT;
          }
          if(marginB !== undefined){
            question.marginB = marginB;
          }
          
          // setting padding

          if(paddingL !== undefined){
            question.paddingL = paddingL;
          }
          if(paddingR !== undefined){
            question.paddingR = paddingR;
          }
          if(paddingT !== undefined){
            question.paddingT = paddingT;
          }
          if(paddingB !== undefined){
            question.paddingB = paddingB;
          }

          // setting shuffle option
          if(shuffle !== undefined){
            question.shuffle = shuffle
          }
        }
        return question;
      });
    },

    //clears the question for new form
    clearQuestion(state, action) {
      state.count = 0;
      state.data = [];
    },
  },
});

export const queActions = questionSlice.actions;
export default questionSlice;
