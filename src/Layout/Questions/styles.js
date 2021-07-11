import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root:{
        backgroundColor:'whiteSmoke',
    },
    label:{
        fontSize:'small',
        backgroundColor:theme.palette.primary.main,
        color:'white',
        padding:"6px",
        borderRadius:'4px',
        boxShadow:"1px 1px 3px grey",
    },
    question:{
        width:'96%',
        marginTop:'4px',
    },
    deleteBtn:{
        color:'red'
    },
    formControl:{
        minWidth:120,
        marginInline:theme.spacing(1)
    },
    head:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:'2px'
    },
    setting:{
        marginInline:theme.spacing(2),
        marginTop:'6px',
        width:'96%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap'
    },
    marks:{
        width:'96px'
    },
    options:{
        width:'92%',
        margin:'auto',
        display:'flex',
        flexDirection:'column',
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(1),
    },
    addOP:{
        width:'40%'
    }
}));
export default useStyles;