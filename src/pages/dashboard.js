import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import useStyles from "../UI-Styles/dashboard";
import { HiViewGridAdd } from "react-icons/hi";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { initForm } from '../store/thunks/formThunk';
import UIRes from "../components/uiResponces";

const Dashboard = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography className={`${classes.text} brand`}>
            Questionnaire
          </Typography>
        </Toolbar>
        <Toolbar>
          <IconButton onClick={e => dispatch(initForm(history))} >
            <HiViewGridAdd color="#3f50b5" size="1.25em" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <UIRes/>
    </div>
  );
};

export default Dashboard;
