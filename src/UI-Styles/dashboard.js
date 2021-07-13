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
  allForms:{
    display:'flex',
    flexDirection:'column',
    margin:'auto',
    width:'256px'
  },
  formElement:{
    marginTop:'4px',
    marginBottom:'4px',
    padding:'8px',
    borderRadius:'4px',
    boxShadow:'2px 2px 4px grey',
    transition:'0.1s',
    '&:hover':{
      cursor:'pointer',
      transform:'scaleX(1.01)',
      transition:'0.1s',
    }
  }
}));

export default useStyles;
