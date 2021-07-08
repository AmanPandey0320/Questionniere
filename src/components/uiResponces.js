import { Backdrop, Snackbar, CircularProgress,makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/reducers/uiSlice";
import { useState } from "react";
import Portal from "./portal";

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    }
  }));

const UIRes = (props) => {
  const [snackbar, setSnackbar] = useState(false);
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Portal>
      <Backdrop
        onClick={() => {
          setSnackbar(true);
        }}
        className={classes.backdrop}
        open={ui.drop}
      >
        <CircularProgress color="primary" />
        <Snackbar
          open={snackbar}
          autoHideDuration={3000}
          onClose={() => {
            setSnackbar(false);
          }}
        >
          <Alert
            onClose={() => {
              setSnackbar(false);
            }}
            severity="info"
          >
            Please wait while we login!
          </Alert>
        </Snackbar>
      </Backdrop>
      <Snackbar
        open={ui.notification.show}
        autoHideDuration={5000}
        onClose={(e) =>
          dispatch(
            uiActions.sendNotification({
              text: "",
              severity: "info",
              show: false,
            })
          )
        }
      >
        <Alert
          onClose={(e) =>
            dispatch(
              uiActions.sendNotification({
                text: "",
                severity: "info",
                show: false,
              })
            )
          }
          severity={ui.notification.severity}
        >
          {ui.notification.text}
        </Alert>
      </Snackbar>
    </Portal>
  );
};

export default UIRes;
