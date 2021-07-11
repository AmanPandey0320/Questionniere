import { useSelector, useDispatch } from "react-redux";
import { queActions } from "../../store/reducers/queSlice";
import { optionActions } from "../../store/reducers/optionSlice";
import OptionC from "./elements/optionC";
import OptionR from "./elements/optionR";
import SingleC from "./elements/singleC";
import MultiR from "./elements/multiR";
import useStyles from "./styles";
import {
  TextField,
  IconButton,
  FormControl,
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
import {
  MdAdd,
  MdShortText,
  MdDateRange,
  MdArrowDropDownCircle,
} from "react-icons/md";
import { BsTextLeft, BsCheckBox, BsFileArrowUp } from "react-icons/bs";
import {
  BiGridVertical,
  BiRadioCircleMarked,
  BiTimeFive,
} from "react-icons/bi";
import { TiTick } from "react-icons/ti";
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
  const [shuffle, setShuffle] = useState(Boolean(question.shuffle));

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
  };

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
    }, 10);

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
          shuffle,
          require,
          negative: negmarks,
        })
      );
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [code, marks, negmarks, showMarks, require, shuffle, dispatch]);

  // console.log(question)

  return (
    <div className={classes.root} style={{ ...rootStyles }}>
      <div className={classes.head}>
        <span>
          <span className={classes.label}>Question {index + 1}</span>
        </span>
        <span>
          <FormControl variant="outlined" color="primary" className={classes.formControl}>
            <Select
              value={input}
              id={`SLCT_${code}`}
              onChange={(e) => setInput(e.target.value)}
            >
              <MenuItem value={0}>
                <MdShortText />
                &nbsp;Small text
              </MenuItem>
              <MenuItem value={1}>
                <BsTextLeft />
                &nbsp;Long text
              </MenuItem>
              <MenuItem value={2}>
                <BiRadioCircleMarked />
                &nbsp;Single radio
              </MenuItem>
              <MenuItem value={3}>
                <BiRadioCircleMarked />
                &nbsp;Multiple radio
              </MenuItem>
              <MenuItem value={4}>
                <BsCheckBox />
                &nbsp;Single checkbox
              </MenuItem>
              <MenuItem value={5}>
                <BsCheckBox />
                &nbsp;Multiple checkbox
              </MenuItem>
              <MenuItem value={6}>
                <MdDateRange />
                &nbsp;Date &amp; time
              </MenuItem>
              <MenuItem value={7}>
                <BsFileArrowUp />
                &nbsp;File upload
              </MenuItem>
              <MenuItem value={8}>
                <MdArrowDropDownCircle />
                &nbsp;Dropdown
              </MenuItem>
              <MenuItem value={9}>
                <MdDateRange />
                &nbsp;Date
              </MenuItem>
              <MenuItem value={10}>
                <BiTimeFive />
                &nbsp;Time
              </MenuItem>
              <MenuItem value={11}>
                <TiTick />
                &nbsp;True/False
              </MenuItem>
            </Select>
          </FormControl>
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
      {(input === 2 ||
        input === 3 ||
        input === 4 ||
        input === 5 ||
        input === 8) && (
        <div className={classes.options}>
          {input === 8 && options.length > 0 && (
            <Select className={classes.dropdown}>
              {options.map((op) => {
                return <MenuItem key={op.code}>{op.text}</MenuItem>;
              })}
            </Select>
          )}
          {input === 5 && (
            <>
              {options.map((option) => {
                return <OptionC key={option.code} code={option.code} />;
              })}
            </>
          )}
          {(input === 2 || input === 8) && (
            <>
              <RadioGroup
                onChange={(e) => setRadio(e.target.value)}
                value={radio}
                name={` RAD_${code}`}
              >
                {options.map((option) => {
                  return <OptionR key={option.code} code={option.code} />;
                })}
              </RadioGroup>
            </>
          )}
          {input === 3 && (
            <>
              {options.map((option) => {
                return <MultiR key={option.code} code={option.code} />;
              })}
            </>
          )}
          {input === 4 && (
            <>
              {options.map((option) => {
                return <SingleC key={option.code} code={option.code} />;
              })}
            </>
          )}

          <Button
            className={classes.addOP}
            variant="outlined"
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
            <FormControlLabel
              disabled={
                !(
                  input === 2 ||
                  input === 3 ||
                  input === 4 ||
                  input === 5 ||
                  input === 8
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
          </MenuItem>
          <Divider />
          <MenuItem></MenuItem>
        </Menu>
        <Modal code={question.code} open={modal} handleClose={setModal} />
      </Portal>
    </div>
  );
};

export default Question;
