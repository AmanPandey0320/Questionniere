import firebase from "../../Logic/firebase";
import { uiActions } from "../reducers/uiSlice";
import { authActions } from "../reducers/authSlice";
import store from "../rootReducer";

export const authThunkhandler = (email, password, signup) => {
  return (dispatch) => {
    dispatch(uiActions.toggleDrop());

    if (signup) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          dispatch(uiActions.toggleDrop());
          dispatch(
            uiActions.sendNotification({
              text: "Successfully signed-up",
              severity: "success",
              show: true,
            })
          );
          const { user } = res;
          dispatch(
            authActions.login({
              email,
              uid: user.uid,
            })
          );
        })
        .catch((err) => {
          store.dispatch(uiActions.toggleDrop());
          store.dispatch(
            uiActions.sendNotification({
              text: err.message,
              severity: "success",
              show: true,
            })
          );
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          const { user } = res;
          dispatch(
            authActions.login({
              email,
              uid: user.uid,
            })
          );
          dispatch(uiActions.toggleDrop());
          dispatch(
            uiActions.sendNotification({
              text: "Successfully signed-in",
              severity: "success",
              show: true,
            })
          );
        })
        .catch((err) => {
          dispatch(uiActions.toggleDrop());
          dispatch(
            uiActions.sendNotification({
              text: err.message,
              severity: "success",
              show: true,
            })
          );
        });
    }
  };
};
