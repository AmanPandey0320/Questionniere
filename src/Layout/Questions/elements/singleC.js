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
import { useEffect, useRef, useState } from "react";

const Option = (props) => {
  const classes = useStyles();
  const { code } = props;
  const dispatch = useDispatch();
  const [option] = useSelector((state) =>
    state.option.data.filter((op) => op.code === code)
  );
  const [isTrue, setIsTrue] = useState(option.isTrue);
  const [text, setText] = useState(option.text);
  const isMounted = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(optionActions.editOption({ code, text }));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [text, dispatch, code]);

  useEffect(() => {
    if (isMounted.current && isTrue) {
      dispatch(optionActions.setSingleCorrect({ code, que_id: option.que_id }));
    } else {
      isMounted.current = true;
    }
  }, [isTrue, dispatch, code, option.que_id]);

  useEffect(() => {
      setIsTrue(option.isTrue)
  },[option.isTrue])

  console.log(option);
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
      <IconButton
        onClick={(e) => dispatch(optionActions.deleteOption({ code }))}
      >
        <MdCancel />
      </IconButton>
    </div>
  );
};

export default Option;
