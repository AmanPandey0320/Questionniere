import useStyles from "./styles";
import { TextField, IconButton, Menu, MenuItem } from "@material-ui/core";
import { blockActions } from "../../store/reducers/blockSlice";
import { queActions } from "../../store/reducers/queSlice";
import { useSelector, useDispatch } from "react-redux";
import { BiGridVertical } from "react-icons/bi";
import { useEffect, useState } from "react";
import Question from "../Questions/index";
import Portal from "../../components/portal";

const Block = (props) => {
  const classes = useStyles();
  const { code } = props;
  const [anchor, setAnchor] = useState(null);
  const [block] = useSelector((state) =>
    state.block.data.filter((block) => block.code === code)
  );
  const questions = useSelector(state => state.question.data.filter(question => question.blk_id === block.id));
  const [desc, setDesc] = useState(block.desc);
  const dispatch = useDispatch();

  // console.log(block);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(blockActions.editBlock({ code, desc }));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [desc, code, dispatch]);

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
      <div className = {classes.questions} >
        {questions.map((question,index) => {
          return(
            <Question key = {question.code} index={index} code={question.code}/>
          )
        })}
      </div>
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
          <MenuItem
            onClick={(e) => {
              dispatch(
                queActions.addQuestion({
                  qnr_id: block.qnr_id,
                  sec_id: block.sec_id,
                  blk_id: block.id,
                })
              );
              setAnchor(null);
            }}
          >
            &nbsp;New question&nbsp;
          </MenuItem>
        </Menu>
      </Portal>
    </div>
  );
};

export default Block;
