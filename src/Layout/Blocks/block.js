import useStyles from "./styles";
import { TextField, IconButton, Menu, MenuItem } from "@material-ui/core";
import { formActions } from "../../store/reducers/formSlice";
import { useSelector, useDispatch } from "react-redux";
import { BiGridVertical } from "react-icons/bi";
import { useEffect, useState } from "react";
import Portal from "../../components/portal";

const Block = (props) => {
  const classes = useStyles();
  const { data } = props;
  const { id, sec_id } = data;
  const [anchor, setAnchor] = useState(null);
  const block = useSelector((state) => {
    const [section] = state.form.section.filter((section) => section.id === sec_id);
    const [block] = section.blocks.filter((block) => block.id === id);
    return block;
  });
  const [desc,setDesc] = useState(block.desc);

  return (
    <div className={classes.root}>
      <div className={classes.head}>
        <TextField
          multiline
          value={desc}
          onChange={e => setDesc(e.target.value)}
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
          id={`MENU_${data.code}`}
        >
          <MenuItem>&nbsp;Delete&nbsp;</MenuItem>
        </Menu>
      </Portal>
    </div>
  );
};

export default Block;
