import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root:{
        backgroundColor:'whiteSmoke',
        borderRightStyle:'solid',
        borderRightWidth:'4px',
        borderColor:theme.palette.primary.main
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
        width:'64%',
        marginTop:'4px',
        [theme.breakpoints.between('xs','sm')]:{
            width:'96%'
        }
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
        marginTop:'4px',
    },
    setting:{
        marginInline:theme.spacing(2),
        marginTop:'6px',
        width:'96%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        flexWrap:'wrap'
    },
    marks:{
        width:'96px'
    },
    options:{
        width:'96%',
        margin:'auto',
        display:'flex',
        flexDirection:'column',
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(1),
    },
    addOP:{
        width:'32%',
        [theme.breakpoints.between('xs','sm')]:{
            width:'50%'
        }
    },
    dropdown:{
        width:'32%',
        marginBottom:'4px'
    }
}));
export default useStyles;