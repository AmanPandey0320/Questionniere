import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  setting: {
    marginInline: theme.spacing(2),
    marginTop: "6px",
    width: "96%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  marks: {
    width: "96px",
  },
}));

export default useStyles;
