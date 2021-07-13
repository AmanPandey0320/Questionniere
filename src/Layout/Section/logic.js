import { blockActions } from "../../store/reducers/blockSlice";
import { formActions } from "../../store/reducers/formSlice";
import store from "../../store/rootReducer";

/**
 * function to add new section
 * @param {*} e 
 */
export const addNewSection = (e) => {
  store.dispatch(formActions.addNewSection());
};

/**
 * function to delete section on basis of code
 * @param {*} code
 * @returns
 */

export const deleteSection = (code) => (e) => {
  store.dispatch(formActions.deleteSection({ code }));
};

/**
 * function to add new block to a section
 * @param {*} section
 * @returns
 */
export const addBlock = (section) => (e) => {
  store.dispatch(
    blockActions.addBlock({
      qnr_id: section.qnr_id,
      sec_id: section.id,
      color: section.color,
    })
  );
};
