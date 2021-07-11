import {
  Modal,
  Fade,
  Backdrop,
  makeStyles,
  Typography,
  Grid,
  Slider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { queActions } from "../store/reducers/queSlice";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "2px 2px 2px grey",
    borderRadius: "8px",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    [theme.breakpoints.between('xs','sm')]:{
      flexDirection:'column'
    }
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  width: {
    width: 160,
    marginInline: "16px",
  }
}));

const SettingModal = (props) => {
  const { open, handleClose, code } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [question] = useSelector((state) =>
    state.question.data.filter((que) => que.code === code)
  );
  const [width, setWidth] = useState(question.width);
  const [marginL, setMarginL] = useState(question.marginL);
  const [marginR, setMarginR] = useState(question.marginR);
  const [marginT, setMarginT] = useState(question.marginT);
  const [marginB, setMarginB] = useState(question.marginB);

  const [paddingL, setPaddingL] = useState(question.paddingL);
  const [paddingR, setPaddingR] = useState(question.paddingR);
  const [paddingT, setPaddingT] = useState(question.paddingT);
  const [paddingB, setPaddingB] = useState(question.paddingB);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        queActions.editQuestion({
          code,
          width,
          marginB,
          marginL,
          marginR,
          marginT,
          paddingB,
          paddingL,
          paddingR,
          paddingT,
        })
      );
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [
    width,
    marginB,
    marginL,
    marginR,
    marginT,
    paddingB,
    paddingL,
    paddingR,
    paddingT,
    dispatch,
    code,
  ]);

  //   console.log(question)

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={(e) => handleClose(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 100,
      }}
    >
      <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.col}>
              <div className={classes.width}>
                <Typography id="width-slider" gutterBottom>
                  Width
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={typeof width === "number" ? width : 0}
                      onChange={(e, n) => setWidth(n)}
                      aria-labelledby="input-slider"
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={classes.width}>
                <Typography id="ml-slider" gutterBottom>
                  Margin left
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={typeof marginL === "number" ? marginL : 0}
                      onChange={(e, n) => setMarginL(n)}
                      aria-labelledby="input-slider"
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={classes.width}>
                <Typography id="mr-slider" gutterBottom>
                  Margin Right
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={typeof marginR === "number" ? marginR : 0}
                      onChange={(e, n) => setMarginR(n)}
                      aria-labelledby="input-slider"
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={classes.width}>
                <Typography id="mt-slider" gutterBottom>
                  Margin Top
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={typeof marginT === "number" ? marginT : 0}
                      onChange={(e, n) => setMarginT(n)}
                      aria-labelledby="input-slider"
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={classes.width}>
                <Typography id="mb-slider" gutterBottom>
                  Margin Bottom
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={typeof marginB === "number" ? marginB : 0}
                      onChange={(e, n) => setMarginB(n)}
                      aria-labelledby="input-slider"
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className={classes.col}>
              <div className={classes.width}>
                <Typography id="pl-slider" gutterBottom>
                  Padding left
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={typeof paddingL === "number" ? paddingL : 0}
                      onChange={(e, n) => setPaddingL(n)}
                      aria-labelledby="input-slider"
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={classes.width}>
                <Typography id="pr-slider" gutterBottom>
                  Padding Right
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={typeof paddingR === "number" ? paddingR : 0}
                      onChange={(e, n) => setPaddingR(n)}
                      aria-labelledby="input-slider"
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={classes.width}>
                <Typography id="pt-slider" gutterBottom>
                  Padding Top
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={typeof paddingT === "number" ? paddingT : 0}
                      onChange={(e, n) => setPaddingT(n)}
                      aria-labelledby="input-slider"
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={classes.width}>
                <Typography id="pb-slider" gutterBottom>
                  Padding Bottom
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={typeof paddingB === "number" ? paddingB : 0}
                      onChange={(e, n) => setPaddingB(n)}
                      aria-labelledby="input-slider"
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
      </Fade>
    </Modal>
  );
};

export default SettingModal;
