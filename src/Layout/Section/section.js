import useStyles, { theme } from "./styles";
import { TextField, ThemeProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../store/reducers/formSlice";
const Section = (props) => {
  const classes = useStyles();
  const section = useSelector((state) => state.form.section[props.sec]);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(section.title);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        formActions.editSection({
          title,
          code: section.code,
        })
      );
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [title, dispatch, section.code]);
  console.log(section);
  return (
    <div className={classes.root}>
      <div className={classes.head}>
        <ThemeProvider theme={theme}>
          <TextField
            className={classes.headText}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Section;
