import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root:{
        padding:'16px 8px',
        boxShadow:'2px 2px 4px grey',
        width:'100%',
        marginTop:'8px',
        borderRadius:'4px',
        display:'flex',
        flexDirection:'column',
        '&:hover':{
            cursor:'pointer',
            scale:'1.03'
        },
    },
    head:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    headText:{
        width:'75%'
    }
}));

export default useStyles;