import { makeStyles } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100vw",
    width: "100vw",
    margin: 0,
  },
  text: {
    color: "#424242",
    "&.brand": {
      fontSize: "x-large",
    },
    "&.large":{
      width:'512px',
      marginInline:theme.spacing(4)
    }
  },
  appbar: {
    backgroundColor: "white",
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  toolbarL:{
    display:'flex',
    flexDirection:'row'
  },
  form:{
      width:'60vw',
      display:'flex',
      flexDirection:'column',
      margin:'auto'
  },
  toggler:{
    width:'256px',
    margin:'auto',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  togglerText:{
    paddingTop:theme.spacing(1),
    textAlign:'center'
  }
}));

export const theme = createTheme({
  palette:{
    primary:{
      main:'#424242'
    }
  }
})

export default useStyles;
