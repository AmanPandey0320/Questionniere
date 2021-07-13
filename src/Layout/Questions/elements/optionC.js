import useStyles from "./styles";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import { MdCancel } from "react-icons/md";
import { optionActions } from "../../../store/reducers/optionSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

/**
 *
 * @param {*
 * option code
 * } props
 * @returns Multiple choice checkBox with textbox
 */

const Option = (props) => {
  const { code } = props;

  /**
   * fetching the option with code from store
   */
  const [option] = useSelector((state) =>
    state.option.data.filter((op) => op.code === code)
  );

  const classes = useStyles();
  const dispatch = useDispatch();

  const [isTrue, setIsTrue] = useState(option.isTrue);
  const [text, setText] = useState(option.text);
  const isMounted = useRef(false);

  /**
   * the updates the store
   * when the text changes
   */

  useEffect(() => {
    if (isMounted.current) {
      dispatch(optionActions.editOption({ code, text }));
    } else {
      isMounted.current = true;
    }
  }, [text, dispatch, code]);

  /**
   * this updates the store
   * when the checkbox is toggled
   */

  useEffect(() => {
    if (isMounted.current) {
      dispatch(optionActions.editOption({ code, isTrue }));
    } else {
      isMounted.current = true;
    }
  }, [isTrue, dispatch, code]);

  /**
   * handle the option deletion
   * @param {*} e 
   */

  const handleDelete = (e) => {
    dispatch(optionActions.deleteOption({ code }));
  };

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isTrue}
            onChange={(e) => setIsTrue(e.target.checked)}
            color="primary"
          />
        }
        label={
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={classes.textfield}
          />
        }
      />
      <IconButton onClick={handleDelete}>
        <MdCancel />
      </IconButton>
    </div>
  );
};

export default Option;
