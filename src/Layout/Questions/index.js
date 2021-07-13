import { useSelector, useDispatch } from "react-redux";
import { queActions } from "../../store/reducers/queSlice";
import useStyles from "./styles";
import { TextField, Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import InputType from "./InputType/index";
import DropDown from "./DropDown/index";
import SingleChoiceRadio from "./SingleRadio";
import OptionList from "./OptionsHOC/OptionList";
import Settings from "./Settings";
import SettingMenu from "./Settings/menu";
import Error from "./Error";
import { getRootStyles,addOptions } from "./logic";

/**
 *
 * @param {
 * question code
 * index
 * } props
 * @returns
 */

const Question = (props) => {
  const { code, index } = props;

  //fetching question according to code
  const [question] = useSelector((state) =>
    state.question.data.filter((que) => que.code === code)
  );

  //variables
  const [que, setQue] = useState(question.question);
  const isMounted = useRef(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  //question styles
  const rootStyles = getRootStyles(question);

  //upadatind store on question change
  useEffect(() => {
    if (isMounted.current) {
      //runs from second render
      const valid = Boolean(que.trim());
      dispatch(queActions.editQuestion({ code, que, valid }));
    } else {
      //runs only for first render
      isMounted.current = true;
    }
  }, [que, code, dispatch]);

  return (
    <div className={classes.root} style={{ ...rootStyles }}>
      <div className={classes.head}>
        <span>
          <span className={classes.label}>Question {index + 1}</span>
        </span>
        <span>
          <InputType input={question.input_type} code={question.code} />
          <SettingMenu code={question.code} />
        </span>
      </div>
      <div>
        <TextField
          value={que}
          label="Question"
          className={classes.question}
          onChange={(e) => setQue(e.target.value)}
        />
      </div>
      <Error input={question.input_type} id={question.id} />

      {
        /**
         * check id question input_type is a redio/checkbox or dropdown
         * then render options
         */
      }

      {((question.input_type >= 2 && question.input_type <= 5) ||
        question.input_type === 8) && (
        <div className={classes.options}>
          <DropDown id={question.id} input_type={question.input_type} />
          <SingleChoiceRadio
            id={question.id}
            input_type={question.input_type}
          />
          <OptionList id={question.id} input_type={question.input_type} />

          <Button
            className={classes.addOP}
            variant="outlined"
            onClick={addOptions(question)}
            color="primary"
          >
            <MdAdd />
            &nbsp;Add option
          </Button>
        </div>
      )}
      <Settings code={question.code} />
    </div>
  );
};

export default Question;
