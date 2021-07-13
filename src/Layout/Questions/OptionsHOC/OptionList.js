import { useSelector } from "react-redux";
import MultiR from "../elements/multiR";
import OptionC from "../elements/optionC";
import SingleC from "../elements/singleC";

/**
 *
 * @param {
 * input_type
 * quesition_id
 * } props
 * @returns
 */
const OptionList = (props) => {
  const options = useSelector((state) =>
    state.option.data.filter((option) => option.que_id === props.id)
  );
  return (
    <>
      {props.input_type >= 3 && props.input_type <= 5 && (
        <>
          {options.map((option) => {
            // return <MultiR key={option.code} code={option.code} />;
            if(props.input_type === 3){
                return <MultiR key={option.code} code={option.code} />
            }else if(props.input_type === 4){
                return <SingleC key={option.code} code={option.code} />
            }else{
                return <OptionC key={option.code} code={option.code} />
            }
          })}
        </>
      )}
    </>
  );
};

export default OptionList;
