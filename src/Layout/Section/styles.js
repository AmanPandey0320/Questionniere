import { makeStyles } from '@material-ui/core';
import { createTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root:{
        display:'flex',
        flexDirection:'column',
        width:'100%',
        marginTop:'4px',
        padding:theme.spacing(2),
        backgroundColor:"primary",
        [theme.breakpoints.between('xs','sm')]:{
          padding:theme.spacing(0),
        }
    },
    head:{
        marginTop:'0px',
        width:'96%',
        borderRadius:'8px',
        borderTopLeftRadius:'0px',
        boxShadow:'2px 2px 4px grey',
        padding:'16px 8px',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        borderTopWidth:'6px',
        borderTopStyle:'solid',
        borderLeftWidth:'2px',
        borderLeftStyle:'solid'
    },
    headText:{
        width:'80%',
    },
    blocks:{
      marginRight:0,
      width:'96%'
    },
    sectionHead:{
      width:'max-content',
      padding:'4px 12px',
      paddingRight:'16px',
      color:'white',
      borderTopRightRadius:'8px',
      borderBottomRightRadius:'0px',
      borderTopLeftRadius:'4px',
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