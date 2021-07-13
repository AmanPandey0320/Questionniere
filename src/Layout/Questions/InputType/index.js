import { FormControl, Select, MenuItem } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { inputTypes } from "../../../assets/inputTypes";
import { queActions } from "../../../store/reducers/queSlice";
import useStyles from "./styles";

/**
 * Component to handle input types
 */

const InputType = (props) => {
  const [input, setInput] = useState(props.input);
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  /**
   * Effect to dispatch action to store
   * listens to input change events
   */
  useEffect(() => {
    if(isMounted.current){
        dispatch(queActions.setType({ input, code: props.code }));
    }else{
        isMounted.current = true;
    }
  }, [input, props.code, dispatch]);

  return (
    <FormControl
      variant="outlined"
      color="primary"
      className={classes.formControl}
    >
      <Select
        value={input}
        id={`SLCT_${props.code}`}
        onChange={(e) => setInput(e.target.value)}
      >
        {inputTypes.map((inputType) => {
          return (
            <MenuItem key={inputType.key} value={inputType.value}>
              {inputType.icon}
              &nbsp;{inputType.text}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default InputType;
