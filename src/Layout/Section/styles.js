import { makeStyles } from '@material-ui/core';
import { createTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root:{
        display:'flex',
        flexDirection:'column',
    },
    head:{
        marginTop:theme.spacing(2),
        width:'100%',
        borderRadius:'8px',
        boxShadow:'2px 2px 4px grey',
        padding:'16px 8px'
    },
    headText:{
        width:'80%',
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