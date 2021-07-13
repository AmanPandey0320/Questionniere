import { useSelector } from "react-redux";

const Error = (props) => {
  const options = useSelector((state) =>
    state.option.data.filter((option) => option.que_id === props.id)
  );
  if (((props.input >= 2 && props.input <= 5) || props.input === 8) && options.length === 0) {
    return (
      <small style={{ color: "tomato" }}>
        **Please add options else the question will be deleted during submission
      </small>
    );
  } else {
    return <small></small>;
  }
};

export default Error;
