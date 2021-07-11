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
    width:'100%',
    "&.brand": {
      fontSize: "xx-large",
    },
    "&.large":{
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
      margin:0,
      padding:0,
      [theme.breakpoints.between('xs','sm')]:{
        width:'96vw',
        margin:'auto'
      }
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
  },
  questionniare:{
    display:'flex',
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    [theme.breakpoints.between('xs','sm')]:{
      flexDirection:'column'
    }
  },
  questionniareSetting:{
    width:'21vw',
    marginRight:16,
    marginTop:16,
    [theme.breakpoints.between('xs','sm')]:{
      width:'96vw',
      margin:'auto'
    }
  },
  qnrSettingBody:{
    borderRadius:8,
    borderTopLeftRadius:'0px',
    borderBottomLeftRadius:'0px',
    boxShadow:"2px 2px 3px grey",
    padding:'8px',
    borderTopStyle:'solid',
    borderTopColor:'#3f51b5',
    borderTopWidth:'4px',
    borderLeftStyle:'solid',
    borderLeftColor:'#3f51b5',
    borderLeftWidth:'1px',
    marginTop:0,
  },
  qnrHead:{
    width:'max-content',
    backgroundColor:'#3f51b5',
    color:'white',
    padding:'4px 16px',
    marginTop:'0px',
    borderTopLeftRadius:'8px',
    borderTopRightRadius:'8px'
  },
  qnr_cf:{
    width:'8vw',
    marginTop:"1%",
    marginRight:'6px',
    [theme.breakpoints.between('xs','sm')]:{
      width:'42vw',
      margin:'auto',
      marginRight:'0px'
    }
  },
  qnr_marks:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:'4px',
    flexWrap:'wrap'
  }
}));

export const theme = createTheme({
  palette:{
    primary:{
      main:'#3f51b5'
    }
  }
})

export default useStyles;
