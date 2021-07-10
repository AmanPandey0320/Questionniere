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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../store/reducers/formSlice";
import { blockActions } from "../../store/reducers/blockSlice";
import { BiGridVertical } from "react-icons/bi";
import Modal from "../../components/modal";
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
  const [modal, setModal] = useState(false);
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

  // console.log(section);

  return (
    <ThemeProvider theme={theme}>
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
                    color:section.color,
                  })
                );
                setAnchor(null);
              }}
            >
              &nbsp;Add block&nbsp;
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                dispatch(formActions.addNewSection());
                setAnchor(null);
              }}
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
      </div>
    </ThemeProvider>
  );
};

export default Section;
