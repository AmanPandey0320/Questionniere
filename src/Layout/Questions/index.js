import { useSelector, useDispatch } from "react-redux";
import { queActions } from "../../store/reducers/queSlice";
import { optionActions } from "../../store/reducers/optionSlice";
import OptionC from "./elements/optionC";
import OptionR from "./elements/optionR";
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
  RadioGroup,
  Menu,
  Divider,
} from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { BiGridVertical } from "react-icons/bi";
import { useEffect, useState } from "react";
import Portal from "../../components/portal";
import Modal from "../../components/questionSettingsModal";

const Question = (props) => {
  const { code, index } = props;
  const [question] = useSelector((state) =>
    state.question.data.filter((que) => que.code === code)
  );
  const options = useSelector((state) =>
    state.option.data.filter((option) => option.que_id === question.id)
  );
  const type = useSelector((state) => state.form.type);
  const [que, setQue] = useState(question.question);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [input, setInput] = useState(question.input_type);
  const [marks, setMarks] = useState(0);
  const [negmarks, setNegmarks] = useState(0);
  const [showMarks, setShowMarks] = useState(Boolean(question.show_marks));
  const [require, setRequire] = useState(Boolean(question.require));
  const [radio, setRadio] = useState(0);
  const [anchor, setAnchor] = useState(null);
  const [modal, setModal] = useState(false);

  const rootStyles = {
    width: `${question.width}%`,
    marginLeft: question.marginL,
    marginRight: question.marginR,
    marginTop: question.marginT,
    marginBottom: question.marginB,
    paddingLeft: question.paddingL,
    paddingRight: question.paddingR,
    paddingTop: question.paddingT,
    paddingBottom: question.paddingB,
  }

  

  useEffect(() => {
    const timer = setTimeout(() => {
      const valid = Boolean(que.trim());
      dispatch(queActions.editQuestion({ code, que, valid }));
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
        optionActions.setSingleCorrect({ que_id: question.id, code: radio })
      );
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [radio, dispatch, question.id]);

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

  return (
    <div className={classes.root} style={{ ...rootStyles }}>
      <div className={classes.head}>
        <span>
          <span className={classes.label}>Question {index + 1}</span>
        </span>
        <span>
          <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
            <BiGridVertical />
          </IconButton>
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
          {options.map((option) => {
            return <OptionC key={option.code} code={option.code} />;
          })}
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
            color="primary"
          >
            <MdAdd />
            &nbsp;Add option
          </Button>
        </div>
      )}
      {input === 2 && (
        <div className={classes.options}>
          <RadioGroup
            onChange={(e) => setRadio(e.target.value)}
            value={radio}
            name={` RAD_${code}`}
          >
            {options.map((option) => {
              return <OptionR key={option.code} code={option.code} />;
            })}
          </RadioGroup>
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
            color="primary"
          >
            <MdAdd />
            &nbsp;Add option
          </Button>
        </div>
      )}
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
      <Portal>
        <Menu
          open={Boolean(anchor)}
          anchorEl={anchor}
          onClose={(e) => setAnchor(null)}
          id={question.code}
        >
          <MenuItem
            onClick={(e) => {
              dispatch(queActions.deleteQuestion({ code }));
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
          <Divider />
          <MenuItem>
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
          </MenuItem>
        </Menu>
        <Modal code={question.code} open={modal} handleClose={setModal} />
      </Portal>
    </div>
  );
};

export default Question;
