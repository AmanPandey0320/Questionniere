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
        // transition:'0.1s',
        '&:hover':{
            cursor:'pointer',
            // transform:'scaleX(1.01)',
            // transition:'0.1s'
        },
    },
    head:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:'8px',
    },
    headText:{
        width:'75%'
    },
    questions:{
        display:'flex',
        flexDirection:'column',
    }
}));

export default useStyles;