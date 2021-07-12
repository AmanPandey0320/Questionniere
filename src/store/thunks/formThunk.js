import firebase from "../../Logic/firebase";
import { uiActions } from "../reducers/uiSlice";
import { formActions } from "../reducers/formSlice";
import { queActions } from "../reducers/queSlice";
import { blockActions } from "../reducers/blockSlice";
import { optionActions } from "../reducers/optionSlice";
import store from "../rootReducer";

const db = firebase.firestore();

export const initForm = (history) => {
  return (dispatch) => {
    dispatch(uiActions.toggleDrop());

    dispatch(formActions.clearForm());
    dispatch(blockActions.clearBlocks());
    dispatch(queActions.clearQuestion());
    dispatch(optionActions.clearOption());

    // console.log(store.getState());
    
    db.collection("forms")
      .add({})
      .then((res) => {
        const id = res.id;
        const code = id;
        dispatch(formActions.editFormData({ id, code }));
        dispatch(formActions.addNewSection());
        dispatch(uiActions.toggleDrop());
        // const form = store.getState().form;
        // console.log(form);
        history.push(`/form/${code}`);
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

export const submitFrom = (history) => {
  return (dispatch) => {
    dispatch(uiActions.toggleDrop());
    const state = store.getState();
    let { block, form, option, question } = state;
    question.data.forEach((que) => {
      const options = option.data.filter((op) => op.que_id === que.id);
      if (
        ((que.input_type === 2 || que.input_type === 3) &&
          options.length === 0) ||
        que.valid === false
      ) {
        store.dispatch(queActions.deleteQuestion({ code: que.code }));
      } else {
        store.dispatch(queActions.editQuestion({ options, code: que.code }));
      }
    });
    question = store.getState().question;

    block.data.forEach((blk) => {
      const children = question.data.filter((que) => que.blk_id === blk.id);

      if (children.length === 0) {
        store.dispatch(blockActions.deleteBlock({ code: blk.code }));
      } else {
        store.dispatch(blockActions.editBlock({ children, code: blk.code }));
      }
    });
    block = store.getState().block;

    form.section.forEach((sec) => {
      const currBlock = block.data.filter((block) => block.sec_id === sec.id);
      if (currBlock.length === 0) {
        store.dispatch(formActions.deleteSection({ code: sec.code }));
      } else {
        store.dispatch(
          formActions.editSection({ code: sec.code, blocks: currBlock })
        );
      }
    });
    form = store.getState().form;

    // console.log(form)

    const id = form.id;

    db.collection("forms")
      .doc(id)
      .set(form)
      .then((res) => {
        dispatch(uiActions.toggleDrop());
        dispatch(
          uiActions.sendNotification({
            severity: "success",
            text: 'Form uploaded',
            show: true,
          })
        );
        history.replace('/home');
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
