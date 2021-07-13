import useStyles from "./styles";
import {
  TextField,
  IconButton,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@material-ui/core";
import { blockActions } from "../../store/reducers/blockSlice";
import { useSelector, useDispatch } from "react-redux";
import { BiGridVertical } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import Question from "../Questions/index";
import Portal from "../../components/portal";
import { addQuestion, handleDelete, handleShuffle } from "./logic";

/**
 *
 * @param {
 * code
 * } props
 * @returns
 */

const Block = (props) => {
  //fetching block props
  const [block] = useSelector((state) =>
    state.block.data.filter((block) => block.code === props.code)
  );

  //fetching questions of a block from store
  const questions = useSelector((state) =>
    state.question.data.filter((question) => question.blk_id === block.id)
  );

  //variables
  const [desc, setDesc] = useState(block.desc);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchor, setAnchor] = useState(null);
  const isMounted = useRef(false);
  const { code } = props;

  //updating store on changing block desc
  useEffect(() => {
    if (isMounted.current) {
      //runs on second render
      dispatch(blockActions.editBlock({ code, desc }));
    } else {
      //runs on first render
      isMounted.current = true;
    }
  }, [desc, code, dispatch]);

  // console.log(block);
  // console.log(questions);

  return (
    <div className={classes.root} style={{ borderLeftColor: block.color }}>
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
      <div className={classes.questions}>
        {questions.map((question, index) => {
          return (
            <Question key={question.code} index={index} code={question.code} />
          );
        })}
      </div>
      <Portal>
        <Menu
          open={Boolean(anchor)}
          anchorEl={anchor}
          keepMounted
          onClose={(e) => setAnchor(null)}
          id={`MENU_${code}`}
          onClick={(e) => setAnchor(null)}
        >
          <MenuItem onClick={handleDelete(code)}>&nbsp;Delete&nbsp;</MenuItem>
          <MenuItem onClick={addQuestion(block)}>
            &nbsp;New question&nbsp;
          </MenuItem>
          <Divider />
          <MenuItem>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(block.shuffle)}
                  onChange={handleShuffle(code)}
                  color="primary"
                />
              }
              label="Shuffle questions"
            />
          </MenuItem>
        </Menu>
      </Portal>
      {questions.length === 0 && (
        <small style={{ color: "tomato" }}>
          **This block is empty and will be deleted during subimssion
        </small>
      )}
    </div>
  );
};

export default Block;
