import useStyles from "./styles";
import { TextField, IconButton, Menu, MenuItem } from "@material-ui/core";
import { blockActions } from "../../store/reducers/blockSlice";
import { useSelector, useDispatch } from "react-redux";
import { BiGridVertical } from "react-icons/bi";
import { useEffect, useState } from "react";
import Portal from "../../components/portal";

const Block = (props) => {
  const classes = useStyles();
  const { code } = props;
  const [anchor, setAnchor] = useState(null);
  const [block] = useSelector((state) =>
    state.block.data.filter((block) => block.code === code)
  );
  const [desc, setDesc] = useState(block.desc);
  const dispatch = useDispatch();

  console.log(block);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      dispatch(blockActions.editBlock({code,desc}))
    },1000);

    return () => {
      clearTimeout(timer);
    }
  },[desc,code,dispatch])

  return (
    <div className={classes.root}>
      <div className={classes.head}>
        <TextField
          multiline
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          label="Block description"
          className={classes.headText}
        />
        <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
          <BiGridVertical />
        </IconButton>
      </div>
      <div>{/* questions here */}</div>
      <Portal>
        <Menu
          open={Boolean(anchor)}
          anchorEl={anchor}
          keepMounted
          onClose={(e) => setAnchor(null)}
          id={`MENU_${code}`}
        >
          <MenuItem
            onClick={(e) => dispatch(blockActions.deleteBlock({ code }))}
          >
            &nbsp;Delete&nbsp;
          </MenuItem>
        </Menu>
      </Portal>
    </div>
  );
};

export default Block;
