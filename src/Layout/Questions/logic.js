import { optionActions } from "../../store/reducers/optionSlice";
import store from "../../store/rootReducer";

/**
 * function to get question styles from store
 */

export const getRootStyles = (question) => {
  return {
    width: `${question.width}%`,
    marginLeft: question.marginL,
    marginRight: question.marginR,
    marginTop: question.marginT,
    marginBottom: question.marginB,
    paddingLeft: question.paddingL,
    paddingRight: question.paddingR,
    paddingTop: question.paddingT,
    paddingBottom: question.paddingB,
  };
};

/**
 * function to add options
 */
export const addOptions = (question) => (e) => {
  store.dispatch(
    optionActions.addOptions({
      qnr_id: question.qnr_id,
      sec_id: question.sec_id,
      blk_id: question.blk_id,
      que_id: question.id,
    })
  );
};
