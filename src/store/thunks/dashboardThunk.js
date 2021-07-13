import firebase from "../../Logic/firebase";
import { allFormAction } from "../reducers/allForms";
import { blockActions } from "../reducers/blockSlice";
import { formActions } from "../reducers/formSlice";
import { optionActions } from "../reducers/optionSlice";
import { queActions } from "../reducers/queSlice";
import { uiActions } from "../reducers/uiSlice";
import store from "../rootReducer";

const db = firebase.firestore();

/**
 * thunk to get all forms from firebase firestore
 * @returns
 */
export const getAllForms = () => {
  return (dispatch) => {
    dispatch(uiActions.toggleDrop());
    const data = [];
    db.collection("forms")
      .orderBy("created_at", "desc")
      .get()
      .then((res) => {
        res.forEach((form) => {
          data.push(form.data());
        });
        dispatch(allFormAction.addForms({ data }));
        dispatch(uiActions.toggleDrop());
        // console.log(data);
      })
      .catch((err) => {
        dispatch(uiActions.toggleDrop());
        dispatch(
          uiActions.sendNotification({
            severity: "error",
            text: err.message,
            show: true,
          })
        );
      });
  };
};

export const createForm = (history, id) => {
  return (dispatch) => {
    const state = store.getState();
    const [form] = state.all.data.filter((form) => form.id === id);

    dispatch(formActions.clearForm());
    dispatch(blockActions.clearBlocks());
    dispatch(queActions.clearQuestion());
    dispatch(optionActions.clearOption());

    //setting form data
    dispatch(formActions.editFormData({ ...form }));

    const sections = form.section;
    const section_count = form.section_count;

    //creating sections
    dispatch(formActions.createSection({ section_count, sections }));

    //creating blocks
    sections.forEach((section) => {
      section.blocks.forEach((block) => {
        dispatch(blockActions.createBlock({ block }));
      });
    });

    //creating questions
    const blocks = store.getState().block.data;
    blocks.forEach((block) => {
      block.children.forEach((question) => {
        dispatch(queActions.createQuestion({ question }));
      });
    });

    //creating options
    const questions = store.getState().question.data;
    questions.forEach(question => {
      question.options.forEach(option => {
        dispatch(optionActions.createOption({option}));
      });
    });

    history.push(`/form/${id}`);
  };
};
