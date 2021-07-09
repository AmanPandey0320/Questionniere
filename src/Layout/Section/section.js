import useStyles, { theme } from "./styles";
import {
  TextField,
  ThemeProvider,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Portal from "../../components/portal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../store/reducers/formSlice";
import { blockActions } from "../../store/reducers/blockSlice";
import { BiGridVertical } from "react-icons/bi";
import Block from "../Blocks/block";
const Section = (props) => {
  const classes = useStyles();
  const section = useSelector((state) => state.form.section[props.sec]);
  const blocks = useSelector((state) =>
    state.block.data.filter(
      (block) => block.sec_id === section.id && block.qnr_id === section.qnr_id
    )
  );
  const dispatch = useDispatch();
  const [title, setTitle] = useState(section.title);
  const [anchor, setAnchor] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        formActions.editSection({
          title,
          code: section.code,
        })
      );
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [title, dispatch, section.code]);

  // console.log(blocks);
  
  return (
    <div className={classes.root}>
      <span>Section</span>
      <div className={classes.head}>
        <ThemeProvider theme={theme}>
          <TextField
            className={classes.headText}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </ThemeProvider>
        <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
          <BiGridVertical />
        </IconButton>
      </div>
      <div className={classes.blocks}>
        {blocks.map((block, index) => {
          return <Block key={block.code} code={block.code} />;
        })}
      </div>
      <Portal>
        <Menu
          id={section.code}
          anchorEl={anchor}
          open={Boolean(anchor)}
          keepMounted={true}
          onClose={(e) => setAnchor(null)}
        >
          <MenuItem
            disabled={props.sec === 0}
            onClick={(e) => {
              dispatch(formActions.deleteSection({ code: section.code }));
              setAnchor(null);
            }}
          >
            &nbsp;Delete&nbsp;
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              dispatch(
                blockActions.addBlock({
                  qnr_id: section.qnr_id,
                  sec_id: section.id,
                })
              );
              setAnchor(null);
            }}
          >
            &nbsp;Add block&nbsp;
          </MenuItem>
        </Menu>
      </Portal>
    </div>
  );
};

export default Section;
