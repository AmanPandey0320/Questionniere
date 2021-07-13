/**
 * reducer to set input type of the question
 * uses question code to do so
 */
export const setType = (state, action) => {
  state.data.map((question) => {
    if (question.code === action.payload.code) {
      question.input_type = action.payload.input;
    }
    return question;
  });
};
