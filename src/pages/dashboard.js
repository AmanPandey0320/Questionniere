import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import useStyles from "../UI-Styles/dashboard";
import { HiViewGridAdd } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initForm } from "../store/thunks/formThunk";
import UIRes from "../components/uiResponces";
import { useEffect } from "react";
import { getAllForms, createForm } from "../store/thunks/dashboardThunk";
import { TiTickOutline,TiCancel } from "react-icons/ti";

const Dashboard = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const forms = useSelector((state) => state.all.data);

  useEffect(() => {
    dispatch(getAllForms());
  }, [dispatch]);

  // console.log(forms);

  return (
    <div>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography className={`${classes.text} brand`}>
            Questionnaire
          </Typography>
        </Toolbar>
        <Toolbar>
          <IconButton onClick={(e) => dispatch(initForm(history))}>
            <HiViewGridAdd color="#3f50b5" size="1.25em" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.allForms}>
        {forms.map((form) => {
          const date = new Date(form.created_at);
          if (form.title) {
            return (
              <div
                key={form.id}
                onClick={(e) => dispatch(createForm(history, form.id))}
                className={classes.formElement}
              >
                <div className={classes.title}>{form.title}</div>
                <div
                  className={classes.created}
                >{`on ${date.getDate()}-${date.getMonth()}-${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</div>
                <div className={classes.title}>
                  {Boolean(form.active) === true ? (
                    <span style={{ color: "green" }}>
                      <TiTickOutline />&nbsp;active
                    </span>
                  ) : (
                    <span style={{ color: "tomato" }}><TiCancel/>&nbsp;disabled</span>
                  )}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <UIRes />
    </div>
  );
};

export default Dashboard;
