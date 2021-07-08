import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100vw",
    width: "100vw",
    margin: 0,
  },
  text: {
    color: "#424242",
    "&.brand": {
      fontSize: "xx-large",
    },
  },
  appbar: {
    backgroundColor: "white",
  },
  form: {
    margin: "auto",
    marginTop: "20vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "16px",
    boxShadow: "2px 2px 4px grey",
    width: theme.spacing(36),
    borderRadius: "4px",
    backgroundColor:'whiteSmoke'
  },
  formElement: {
    width: theme.spacing(32),
    marginTop: theme.spacing(2),
  },
  textButton: {
    color: "#3f50b5",
    fontWeight: "600",
    '&:hover':{
      cursor:'pointer',
      color:'blue'
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

export default useStyles;
