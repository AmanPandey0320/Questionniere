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
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
}));

export default useStyles;
