import { blockActions } from "../../store/reducers/blockSlice";
import { queActions } from "../../store/reducers/queSlice";
import store from "../../store/rootReducer";

/**
 * function to delete a block
 */
export const handleDelete = (code) => (e) => {
  store.dispatch(blockActions.deleteBlock({ code }));
};

/**
 * function to add new question
 */
export const addQuestion = (block) => (e) => {
//   console.log(block);
  store.dispatch(
    queActions.addQuestion({
      qnr_id: block.qnr_id,
      sec_id: block.sec_id,
      blk_id: block.id,
    })
  );
};

/**
 * function to handle shuffle questions
 */

export const handleShuffle = (code) => (e) => {
    store.dispatch(
        blockActions.editBlock({
          code,
          shuffle: e.target.checked,
        })
      );
}