import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { BiGridVertical } from "react-icons/bi";
import { useDispatch } from "react-redux";
import Portal from "../../../components/portal";
import { queActions } from "../../../store/reducers/queSlice";
import Modal from '../../../components/questionSettingsModal';

/**
 *
 * @param {
 * code(question code)
 * } props
 * @returns Setting menu component
 */
const SettingMenu = (props) => {
  const [anchor, setAnchor] = useState(null);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
        <BiGridVertical />
      </IconButton>
      <Portal>
        <Menu
          open={Boolean(anchor)}
          anchorEl={anchor}
          onClose={(e) => setAnchor(null)}
          id={props.code}
        >
          <MenuItem
            onClick={(e) => {
              dispatch(queActions.deleteQuestion({ code: props.code }));
              setAnchor(null);
            }}
          >
            Delete
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              setModal(true);
              setAnchor(null);
            }}
          >
            Setting
          </MenuItem>
        </Menu>
        <Modal code={props.code} open={modal} handleClose={setModal} />
      </Portal>
    </>
  );
};

export default SettingMenu;