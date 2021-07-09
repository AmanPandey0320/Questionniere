import { useSelector, useDispatch } from "react-redux";
import { queActions } from "../../store/reducers/queSlice";
import { optionActions } from "../../store/reducers/optionSlice";
import useStyles from "./styles";
import {
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Switch,
  Button,
} from "@material-ui/core";
import { MdDelete, MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";
const Question = (props) => {
  const { code, index } = props;
  const [question] = useSelector((state) =>
    state.question.data.filter((que) => que.code === code)
  );
  const options = useSelector((state) =>
    state.option.data.filter((option) => option.que_id === question.id)
  );
  const [que, setQue] = useState(question.question);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [input, setInput] = useState(0);
  const [marks, setMarks] = useState(0);
  const [negmarks, setNegmarks] = useState(0);
  const [showMarks, setShowMarks] = useState(Boolean(question.show_marks));
  const [require, setRequire] = useState(Boolean(question.require));

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(queActions.editQuestion({ code, que }));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [que, code, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(queActions.editQuestion({ code, input }));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input, code, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        queActions.editQuestion({
          code,
          marks,
          showMarks,
          require,
          negative: negmarks,
        })
      );
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [code, marks, negmarks, showMarks, require, dispatch]);

  console.log(options);

  return (
    <div className={classes.root}>
      <div className={classes.head}>
        <span>
          <span className={classes.label}>Question {index + 1}</span>
          <span className={classes.deleteBtn}>
            <IconButton
              onClick={(e) => dispatch(queActions.deleteQuestion({ code }))}
            >
              <MdDelete />
            </IconButton>
          </span>
        </span>
        <span>
          <FormControl className={classes.formControl}>
            <InputLabel id={`SLCT_${code}_LBL`}>Input type</InputLabel>
            <Select
              value={input}
              id={`SLCT_${code}`}
              onChange={(e) => setInput(e.target.value)}
              labelId={`SLCT_${code}_LBL`}
            >
              <MenuItem value={0}>Small text</MenuItem>
              <MenuItem value={1}>Long text</MenuItem>
              <MenuItem value={2}>Single option</MenuItem>
              <MenuItem value={3}>Multiple option</MenuItem>
              <MenuItem value={4}>Date</MenuItem>
              <MenuItem value={5}>Time</MenuItem>
              <MenuItem value={6}>Date &amp; time</MenuItem>
              <MenuItem value={7}>File upload</MenuItem>
            </Select>
          </FormControl>
        </span>
      </div>
      <TextField
        value={que}
        label="Question"
        className={classes.question}
        onChange={(e) => setQue(e.target.value)}
      />
      {input === 3 && (
        <div className={classes.options}>
          <Button
            className={classes.addOP}
            onClick={(e) =>
              dispatch(
                optionActions.addOptions({
                  qnr_id: question.qnr_id,
                  sec_id: question.sec_id,
                  blk_id: question.blk_id,
                  que_id: question.id,
                })
              )
            }
            variant="outlined"
            color="primary"
          >
            <MdAdd />
            &nbsp;Add option
          </Button>
        </div>
      )}
      {input === 2 && <div className={classes.options}></div>}
      <div className={classes.setting}>
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
          label="Show marks"
          control={
            <Checkbox
              checked={showMarks}
              onChange={(e) => setShowMarks(e.target.checked)}
              color="primary"
            />
          }
        />
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
    </div>
  );
};

export default Question;
