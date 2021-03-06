import {
  AppBar,
  Toolbar,
  Typography,
  FormControl,
  TextField,
  Button,
} from "@material-ui/core";
import UIres from '../components/uiResponces'
import { BiUserCircle } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useStyles from "../UI-Styles/auth";
import { authThunkhandler } from "../store/thunks/auth";

const Auth = (props) => {
  const classes = useStyles();
  const [signup, setSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [valid, setValid] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailRegex.test(email) === false) {
      document.getElementById("email-error").innerHTML = "** invalid email-id";
      setValid(false);
    } else {
      document.getElementById("email-error").innerHTML = "";
      setValid(true);
    }
  }, [email]);

  useEffect(() => {
    const reges =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (reges.test(password) === false) {
      document.getElementById("password-error").innerHTML = "** weak password";
      setValid(false);
    } else {
      document.getElementById("password-error").innerHTML = "";
      setValid(true);
    }
  }, [password]);

  useEffect(() => {
    if (signup) {
      if (confirm === password) {
        document.getElementById("confirm-error").innerHTML = "";
        setValid(true);
      } else {
        document.getElementById("confirm-error").innerHTML =
          "** password does not match";
        setValid(false);
      }
    }
  }, [confirm, password,signup]);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography className={`${classes.text} brand`}>
            Questionnaire
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.form}>
        <FormControl>
          <BiUserCircle size="5em" color="#3f50b5" />
          <TextField
            className={`${classes.formElement}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Enter your email-ID"
          />
          <small style={{ color: "tomato" }} id="email-error"></small>
          <TextField
            className={`${classes.formElement}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Enter your password"
          />
          <small style={{ color: "tomato" }} id="password-error"></small>
          {signup && (
            <>
              <TextField
                className={`${classes.formElement}`}
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                label="Confirm your password"
              />
              <small style={{ color: "tomato" }} id="confirm-error"></small>
            </>
          )}
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) =>
              dispatch(authThunkhandler(email, password, signup, history))
            }
            className={`${classes.formElement}`}
            disabled={!valid}
          >
            {signup ? "Sign up" : "Sign in"}
          </Button>
          <p className={`${classes.formElement}`}>
            {signup ? (
              <>
                Already a user?&nbsp;
                <span
                  onClick={(e) => setSignup(false)}
                  className={classes.textButton}
                >
                  Sign-In
                </span>
              </>
            ) : (
              <>
                New here?&nbsp;
                <span
                  onClick={(e) => setSignup(true)}
                  className={classes.textButton}
                >
                  Sign-Up
                </span>
              </>
            )}
          </p>
        </FormControl>
      </div>
      <UIres/>
    </div>
  );
};

export default Auth;
