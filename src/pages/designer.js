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
  const [total_marks,setTot] = useState(form.total_marks);
  const [passing_marks,setPass] = useState(form.passing_marks);
  const [type,setType] = useState(form.type);
  const [show_marks,setShow] = useState(form.show_marks);
  const [shuffle_section,setShuffle] = useState(form.shuffle_section);

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

    dispatch(formActions.editFormData({total_marks,passing_marks,shuffle_section,show_marks,type}))

  },[total_marks,passing_marks,shuffle_section,show_marks,type,dispatch])

  useEffect(() => {
    if (sec >= form.section.length) {
      setSec(form.section.length - 1);
    }
  }, [sec, form.section.length]);

  console.log(form);

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
                  control={<Checkbox onChange={e => setShow(e.target.checked)} checked={show_marks}  color="primary" />}
                  label="Show marks"
                />
                <FormControlLabel
                  control={<Checkbox onChange={e => setShuffle(e.target.checked)} checked={shuffle_section} color="primary" />}
                  label="Shuffle section"
                />
              </div>
              <div className={classes.qnr_marks}>
                <TextField
                  color="primary"
                  value={total_marks}
                  onChange={e => setTot(e.target.value)}
                  className={classes.qnr_cf}
                  defaultValue="0"
                  label="Total marks"
                  type="number"
                />
                <TextField
                  color="primary"
                  value={passing_marks}
                  onChange={e => setPass(e.target.value)}
                  className={classes.qnr_cf}
                  defaultValue="0"
                  label="Passing marks"
                  type="number"
                />
              </div>
              <FormControl className={classes.qnr_cf}>
                  <Select onChange={e => setType(e.target.value)} value={type} label="Type">
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
