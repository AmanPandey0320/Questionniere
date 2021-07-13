import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { queActions } from "../../../store/reducers/queSlice";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Switch,
} from "@material-ui/core";
import useStyles from "./styles";

/**
 *
 * @param {
 * code(of the question)
 * } props
 * @returns
 */
const Settings = (props) => {
  const { code } = props;
  /**
   * fetching question properties
   * fetching type
   */
  const type = useSelector((state) => state.form.type);
  const [question] = useSelector((state) =>
    state.question.data.filter((que) => que.code === code)
  );

  // console.log(question)
  // State variables and hooks
  const classes = useStyles();
  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const [marks, setMarks] = useState(0);
  const [negmarks, setNegmarks] = useState(0);
  const [showMarks, setShowMarks] = useState(Boolean(question.show_marks));
  const [require, setRequire] = useState(Boolean(question.require));
  const [shuffle, setShuffle] = useState(Boolean(question.shuffle));

  /**
   * updating store on changes
   */
  useEffect(() => {
    if (isMounted.current) {
      dispatch(
        queActions.editQuestion({
          code,
          marks,
          showMarks,
          shuffle,
          require,
          negative: negmarks,
        })
      );
    } else {
      isMounted.current = true;
    }
  }, [code, marks, negmarks, showMarks, require, shuffle, dispatch]);

  return (
    <div className={classes.setting}>
      {type === 0 && (
        <>
          <TextField
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            label="marks"
            type="number"
            className={classes.marks}
          />
          <TextField
            value={negmarks}
            onChange={(e) => setNegmarks(e.target.value)}
            type="number"
            label="-ve mark"
            className={classes.marks}
          />
          <FormControlLabel
            disabled={
              !(
                (question.input_type >= 2 && question.input_type <= 5) ||
                question.input_type === 8
              )
            }
            label="Shuffle options"
            control={
              <Checkbox
                checked={shuffle}
                color="primary"
                onChange={(e) => setShuffle(e.target.checked)}
              />
            }
          />
          <FormControlLabel
            label="Show marks"
            control={
              <Checkbox
                checked={showMarks}
                onChange={(e) => setShowMarks(e.target.checked)}
                color="primary"
              />
            }
          />
        </>
      )}
      <FormControlLabel
        label="Requied"
        control={
          <Switch
            checked={require}
            onChange={(e) => setRequire(e.target.checked)}
            color="primary"
          />
        }
      />
    </div>
  );
};

export default Settings;
