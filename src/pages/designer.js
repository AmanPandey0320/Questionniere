import {
  AppBar,
  Toolbar,
  TextField,
  ThemeProvider,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { GoSettings } from "react-icons/go";
import { MdSend, MdArrowForward, MdArrowBack, MdAdd } from "react-icons/md";
import useStyles, { theme } from "../UI-Styles/designer";
import { useSelector, useDispatch } from "react-redux";
import { formActions } from "../store/reducers/formSlice";
import { useEffect, useState } from "react";
import Section from "../Layout/Section/section";

const Designer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
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

  useEffect(()=>{
    if(sec >= form.section.length){
      setSec(form.section.length - 1);
    }
  },[sec,form.section.length])

  return (
    <div>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbarL}>
          <ThemeProvider theme={theme}>
            <TextField
              value={title}
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
              className={`${classes.text} brand`}
            />
            <TextField
              value={desc}
              label="Description"
              onChange={(e) => setDesc(e.target.value)}
              className={`${classes.text} brand large`}
            />
          </ThemeProvider>
        </Toolbar>
        <Toolbar>
          <Tooltip title="Form settings">
            <IconButton>
              <GoSettings color="#3f50b5" size="1.25em" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Send settings">
            <IconButton>
              <MdSend color="#3f50b5" size="1.25em" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <div className={classes.toggler}>
        <span>
          <Tooltip title="Previous section">
            <IconButton onClick={e=>{sec!==0?setSec(pre => pre-1):setSec(sec)}} >
              <MdArrowBack color="#3f50b5" />
            </IconButton>
          </Tooltip>
        </span>
        <div className={classes.togglerText}>Section {sec+1}</div>
        {sec + 1 < form.section.length ? (
          <span>
            <Tooltip title="Next section">
              <IconButton onClick={e => setSec(pre => pre+1)} >
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
                  setSec(pre => pre+1);
                }}
              >
                <MdAdd color="#3f50b5" />
              </IconButton>
            </Tooltip>
          </span>
        )}
      </div>
      <div className={classes.form}>
        {(sec<form.section.length) && <Section key={sec} sec={sec} />}
      </div>
    </div>
  );
};

export default Designer;
