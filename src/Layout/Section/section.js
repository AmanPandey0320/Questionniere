import useStyles from "./styles";
import {
  TextField,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import Portal from "../../components/portal";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../store/reducers/formSlice";
import { BiGridVertical } from "react-icons/bi";
import Modal from "../../components/modal";
import Block from "../Blocks/block";
import { deleteSection,addBlock,addNewSection } from "./logic";

/**
 *
 * @param {
 * sec number
 * } props
 * @returns
 */
const Section = (props) => {
  const classes = useStyles();

  //fetching section
  const section = useSelector((state) => state.form.section[props.sec]);

  //fetching blocks of the section
  const blocks = useSelector((state) =>
    state.block.data.filter(
      (block) => block.sec_id === section.id && block.qnr_id === section.qnr_id
    )
  );

  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const [title, setTitle] = useState(section.title);
  const [anchor, setAnchor] = useState(null);
  const [modal, setModal] = useState(false);

  //section theme according to store
  const [theme, setTheme] = useState(
    createTheme({
      palette: {
        primary: {
          main: section.color,
        },
      },
    })
  );

  const handleClose = (evt) => {
    setModal(false);
  };

  //change theme according to store
  useEffect(() => {
    setTheme(
      createTheme({
        palette: {
          primary: {
            main: section.color,
          },
        },
      })
    );
  }, [section.color]);

  //updatind store with section title
  useEffect(() => {
    if (isMounted.current) {
      dispatch(
        formActions.editSection({
          title,
          code: section.code,
        })
      );
    } else {
      isMounted.current = true;
    }
  }, [title, dispatch, section.code]);

  // console.log(section);

  return (
    <ThemeProvider key={section.code} theme={theme}>
      <div className={classes.root}>
        <span
          className={classes.sectionHead}
          style={{ backgroundColor: section.color }}
        >
          Section&nbsp;{props.sec + 1}
        </span>
        <div className={classes.head} style={{ borderColor: section.color }}>
          <TextField
            label="Section title"
            className={classes.headText}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
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
            onClick={(e) => setAnchor(null)}
          >
            <MenuItem
              disabled={props.sec === 0}
              onClick={deleteSection(section.code)}
            >
              &nbsp;Delete&nbsp;
            </MenuItem>
            <MenuItem
              onClick={addBlock(section)}
            >
              &nbsp;Add block&nbsp;
            </MenuItem>
            <MenuItem
              onClick={addNewSection}
            >
              &nbsp;Add Section&nbsp;
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                setModal(true);
                setAnchor(null);
              }}
            >
              {" "}
              &nbsp;Settings&nbsp;
            </MenuItem>
          </Menu>
          <Modal
            open={modal}
            code={section.code}
            id={section.id}
            color={section.color}
            handleClose={handleClose}
          />
        </Portal>
        {blocks.length === 0 && (
          <small style={{ color: "tomato" }}>
            **This Section is empty and will be deleted during subimssion
          </small>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Section;
