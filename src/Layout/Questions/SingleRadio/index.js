import OptionR from "../elements/optionR";
import { RadioGroup } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { optionActions } from "../../../store/reducers/optionSlice";

/**
 *
 * @param {
 * input_type
 * question id
 * } props
 * @returns single Choice radio component
 */

const SingleChoiceRadio = (props) => {
  const options = useSelector((state) =>
    state.option.data.filter((option) => option.que_id === props.id)
  );

  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const [radio, setRadio] = useState(0);

  /**
   * updating store on correct option change
   */
  useEffect(() => {
    if (isMounted.current) {
      dispatch(
        optionActions.setSingleCorrect({ que_id: props.id, code: radio })
      );
    } else {
      isMounted.current = true;
    }
  }, [radio, dispatch, props.id]);

  return (
    <>
      {(props.input_type === 2 || props.input_type === 8) && (
        <>
          <RadioGroup
            onChange={(e) => setRadio(e.target.value)}
            value={radio}
            name={` RAD_${props.id}`}
          >
            {options.map((option) => {
              return <OptionR key={option.code} code={option.code} />;
            })}
          </RadioGroup>
        </>
      )}
    </>
  );
};

export default SingleChoiceRadio;
