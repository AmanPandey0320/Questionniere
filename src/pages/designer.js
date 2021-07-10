import {
  AppBar,
  Toolbar,
  TextField,
  ThemeProvider,
  IconButton,
  Tooltip,
  Typography,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { MdSend } from "react-icons/md";
import useStyles, { theme } from "../UI-Styles/designer";
import { useSelector, useDispatch } from "react-redux";
import { formActions } from "../store/reducers/formSlice";
import { useEffect, useState } from "react";
import Section from "../Layout/Section/section";
import { submitFrom } from "../store/thunks/formThunk";
import { useHistory } from "react-router";
import UIRes from "../components/uiResponces";

const Designer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const form = useSelector((state) => state.form);
  const [title, setTitle] = useState(form.title);
  const [desc, setDesc] = useState(form.desc);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        formActions.editFormData({
          title,
          desc,
        })
      );
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [title, desc, dispatch]);

  useEffect(() => {
    if (sec >= form.section.length) {
      setSec(form.section.length - 1);
    }
  }, [sec, form.section.length]);

  // console.log(form.section);

  return (
    <div>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbarL}>
          <Typography className={`${classes.text} brand`}>
            Questionnaire
          </Typography>
        </Toolbar>
        <Toolbar>
          <Tooltip title="Send settings">
            <IconButton onClick={(e) => dispatch(submitFrom(history))}>
              <MdSend color="#3f50b5" size="1.25em" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {/* <div className={classes.toggler}>
        <span>
          <Tooltip title="Previous section">
            <IconButton
              onClick={(e) => {
                sec !== 0 ? setSec((pre) => pre - 1) : setSec(sec);
              }}
            >
              <MdArrowBack color="#3f50b5" />
            </IconButton>
          </Tooltip>
        </span>
        <div className={classes.togglerText}>Section {sec + 1}</div>
        {sec + 1 < form.section.length ? (
          <span>
            <Tooltip title="Next section">
              <IconButton onClick={(e) => setSec((pre) => pre + 1)}>
                <MdArrowForward color="#3f50b5" />
              </IconButton>
            </Tooltip>
          </span>
        ) : (
          <span>
            <Tooltip title="New section">
              <IconButton
                onClick={(e) => {
                  dispatch(formActions.addNewSection());
                  setSec((pre) => pre + 1);
                }}
              >
                <MdAdd color="#3f50b5" />
              </IconButton>
            </Tooltip>
          </span>
        )}
      </div> */}
      <div className={classes.questionniare}>
        <div className={classes.questionniareSetting}>
          <div className={classes.qnrHead}>Settings</div>
          <div className={classes.qnrSettingBody}>
            <ThemeProvider theme={theme}>
              <div>
                <TextField
                  value={title}
                  label="Title"
                  color="primary"
                  onChange={(e) => setTitle(e.target.value)}
                  className={`${classes.text} brand`}
                />
                <TextField
                  value={desc}
                  label="Description"
                  color="primary"
                  onChange={(e) => setDesc(e.target.value)}
                  className={`${classes.text} brand large`}
                />
              </div>
              <div className={classes.qnr_marks}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Show marks"
                />
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Shuffle section"
                />
              </div>
              <div className={classes.qnr_marks}>
                <TextField
                  color="primary"
                  className={classes.qnr_cf}
                  defaultValue="0"
                  label="Total marks"
                  type="number"
                />
                <TextField
                  color="primary"
                  className={classes.qnr_cf}
                  defaultValue="0"
                  label="Passing marks"
                  type="number"
                />
              </div>
              <FormControl className={classes.qnr_cf}>
                  <Select value={0} label="Type">
                    <MenuItem value={0}>Quiz</MenuItem>
                    <MenuItem value={1}>Feedback</MenuItem>
                  </Select>
                </FormControl>
            </ThemeProvider>
          </div>
        </div>
        <div className={classes.form}>
          {/* {sec < form.section.length && <Section key={sec} sec={sec} />} */}
          {form.section.map((section, index) => (
            <Section key={section.code} sec={index} />
          ))}
        </div>
      </div>
      <br />
      <br />
      <UIRes />
    </div>
  );
};

export default Designer;
