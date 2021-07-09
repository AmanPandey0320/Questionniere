import firebase from "../../Logic/firebase";
import { uiActions } from "../reducers/uiSlice";
import { formActions } from "../reducers/formSlice";
import { queActions } from "../reducers/queSlice";
import { blockActions } from "../reducers/blockSlice";
import store from "../rootReducer";

export const initForm = (history) => {
  return (dispatch) => {
    dispatch(uiActions.toggleDrop());
    const db = firebase.firestore();
    db.collection("forms")
      .get()
      .then((querySnapshot) => {
        let len = 0;
        querySnapshot.forEach((doc) => len++);
        const id = len;
        const code = `QNR_${id}`;
        dispatch(formActions.editFormData({ id, code }));
        dispatch(formActions.addNewSection());
        const form = store.getState().form;
        console.log(form);
        db.collection("forms")
          .add(form)
          .then((res) => {
            dispatch(uiActions.toggleDrop());
            history.push(`/form/${code}`);
          })
          .catch((err) => {
            dispatch(uiActions.toggleDrop());
            dispatch(
              uiActions.sendNotification({
                severity: "error",
                text: "Unable to initialize form!!!",
                show: true,
              })
            );
          });
      })
      .catch((err) => {
        dispatch(uiActions.toggleDrop());
        dispatch(
          uiActions.sendNotification({
            severity: "error",
            text: "Unable to initialize form!!!",
            show: true,
          })
        );
      });
  };
};

export const submitFrom = () => {
  const state = store.getState();
  let { block, form, option, question } = state;
  question.data.forEach((que) => {
    const options = option.data.filter((op) => op.que_id === que.id);
    store.dispatch(queActions.editQuestion({ options, code: que.code }));
  });
  question = store.getState().question;

  block.data.forEach((blk) => {
    const children = question.data.filter((que) => que.blk_id === blk.id);
    store.dispatch(blockActions.editBlock({ children, code: blk.code }));
  });
  block = store.getState().block;

  form.section.forEach(sec => {
      const currBlock = block.data.filter(block => block.sec_id === sec.id)
      store.dispatch(formActions.editSection({code:sec.code,blocks:currBlock}));
  })
  form = store.getState().form;

  console.log(form);
};
