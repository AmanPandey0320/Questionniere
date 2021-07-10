import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root:{
        padding:'16px 8px',
        boxShadow:'2px 2px 4px grey',
        width:'100%',
        marginTop:'8px',
        borderRadius:'4px',
        display:'flex',
        borderLeftStyle:'solid',
        borderLeftWidth:'4px',
        flexDirection:'column',
        '&:hover':{
            cursor:'pointer',
        },
    },
    head:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    headText:{
        width:'75%'
    },
    questions:{
        display:'flex',
        flexDirection:'column',
        width:'90%',
        margin:'auto'
    }
}));

export default useStyles;