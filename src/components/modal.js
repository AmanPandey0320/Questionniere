import {
  Modal,
  Fade,
  Backdrop,
  makeStyles,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../store/reducers/formSlice";
import { CirclePicker } from "react-color";
import { blockActions } from "../store/reducers/blockSlice";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "2px 2px 2px grey",
    borderRadius: "8px",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  color: {
    display: "flex",
    width: "256px",
    flexDirection: "column",
  },
}));

const SettingModal = (props) => {
  const { open, handleClose, code } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [section] = useSelector((state) =>
    state.form.section.filter((sec) => sec.code === code)
  );
  const [shuffle_children,setShuffle] = useState(Boolean(section.shuffle_children))

  useEffect(() => {

    dispatch(formActions.editSection({code,shuffle_children}));

  },[shuffle_children,dispatch,code])

  // console.log(section);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 100,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <div className={classes.color}>
            <p>Color</p>
            <CirclePicker
              width="256px"
              onChange={(c, e) => {
                dispatch(formActions.editSection({ code, color: c.hex }));
                dispatch(
                  blockActions.editBlock({ sec_id: section.id, color: c.hex })
                );
              }}
            />
          </div>
          <div className={classes.color}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={shuffle_children}
                  onChange={(e) => {
                    setShuffle(e.target.checked)
                  }}
                />
              }
              label="Shuffle blocks"
            />
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default SettingModal;
