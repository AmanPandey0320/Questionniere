import { useSelector, useDispatch } from "react-redux";
import { queActions } from "../../store/reducers/queSlice";
import useStyles from "./styles";
import {
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
const Question = (props) => {
  const { code } = props;
  const [question] = useSelector((state) =>
    state.question.data.filter((que) => que.code === code)
  );
  const [que,setQue] = useState(question.question);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [input, setInput] = useState(0);

  useEffect(()=>{
      const timer = setTimeout(() => {
          dispatch(queActions.editQuestion({code,que}));
      },1000);

      return () => {
          clearTimeout(timer);
      }
  },[que,code,dispatch])

  useEffect(() => {
      const timer = setTimeout(() => {
          dispatch(queActions.editQuestion({code,input}));
      },1000);

      return () => {
          clearTimeout(timer)
      }
  },[input,code,dispatch])

  console.log(question)

  return (
    <div className={classes.root}>
      <div className={classes.head}>
        <span>
          <span className={classes.label}>Question 1</span>
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
        value={question.question}
        label="Question"
        className={classes.question}
        onChange={e => setQue(e.target.value)}
      />
    </div>
  );
};

export default Question;
