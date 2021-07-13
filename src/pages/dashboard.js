import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import useStyles from "../UI-Styles/dashboard";
import { HiViewGridAdd } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initForm } from "../store/thunks/formThunk";
import UIRes from "../components/uiResponces";
import { useEffect } from "react";
import { getAllForms,createForm } from "../store/thunks/dashboardThunk";

const Dashboard = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const forms = useSelector((state) => state.all.data);

  useEffect(() => {
    dispatch(getAllForms());
  }, [dispatch]);

  console.log(forms);

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
      <div className={classes.allForms} >
        {forms.map((form) => {
          if(form.title){
            return (
              <div onClick={e => dispatch(createForm(history,form.id))} className={classes.formElement}>
                <div>{form.title}</div>
              </div>
            );
          }else{
            return null;
          }
        })}
      </div>
      <UIRes />
    </div>
  );
};

export default Dashboard;
