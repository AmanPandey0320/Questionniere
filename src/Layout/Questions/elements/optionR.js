import useStyles from "./styles";
import {
  TextField,
  FormControlLabel,
  Radio,
  IconButton,
} from "@material-ui/core";
import { MdCancel } from "react-icons/md";
import { optionActions } from "../../../store/reducers/optionSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Option = (props) => {
  const classes = useStyles();
  const { code } = props;
  const dispatch = useDispatch();
  const [option] = useSelector((state) =>
    state.option.data.filter((op) => op.code === code)
  );
  
  const [text, setText] = useState(option.text);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(optionActions.editOption({ code, text }));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [text, dispatch, code]);

  console.log(option);
  return (
      <FormControlLabel
        control={
          <Radio
            value={code}
            name={`QUE_${option.que_id}`}
            color="primary"
          />
        }
        label={
          <span>
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={classes.textfield}
            />
            <IconButton
              onClick={(e) => dispatch(optionActions.deleteOption({ code }))}
            >
              <MdCancel />
            </IconButton>
          </span>
        }
      />
  );
};

export default Option;
