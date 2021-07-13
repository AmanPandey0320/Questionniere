import { MenuItem, Select } from "@material-ui/core";
import { useSelector } from "react-redux";
import useStyles from "./styles";
/**
 *
 * @param {
 * question id,
 * input_type,
 * } props
 * @returns DropDown Component
 */

const DropDown = (props) => {
  const classes = useStyles();
  const options = useSelector((state) =>
    state.option.data.filter((option) => option.que_id === props.id)
  );
  return (
    <>
      {props.input_type === 8 && options.length > 0 && (
        <Select className={classes.dropdown}>
          {options.map((op) => {
            return <MenuItem key={op.code}>{op.text}</MenuItem>;
          })}
        </Select>
      )}
    </>
  );
};

export default DropDown;
