import React from "react";
import { Box, Button, Grid, Typography, makeStyles } from "@material-ui/core";
import { differenceInMinutes } from "date-fns";
const useStyles = makeStyles((theme) => ({
  wrapper: {
    border: "1px solid #e8e8e8",
    cursor: "pointer",
    transition: "0.3s",

    "&:hover": {
      boxShadow: "0px 5px 25px rgba(0,0,0,0.1)",
      borderLeft: "6px solid #4D64E4"
    }
  },
  companyName: {
    fontSize: "13.5px",
    fontWeight: "600",
    backgroundColor: theme.palette.primary.main,
    display: "inline-block",
    padding: theme.spacing(0.75),
    borderRadius: "5px"
  },
  skillChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    fontWeight: "600",
    backgroundColor: theme.palette.secondary.main,
    color: "#fff"
  }
}));

export default (props) => {
  const classes = useStyles();
  return (
    <Box p={2} className={classes.wrapper}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1">{props.title}</Typography>
          <Typography variant="subtitle1" className={classes.companyName}>
            {props.companyName}
          </Typography>
        </Grid>
        <Grid item container xs>
          {props.skills.map((skill) => (
            <Grid key={skill} item className={classes.skillChip}>
              {skill}
            </Grid>
          ))}
        </Grid>
        <Grid item container direction="column" alignItems="flex-end" xs>
          <Grid item>
            <Typography variant="caption">
              {differenceInMinutes(Date.now(), props.postedOn)} min ago |{" "}
              {props.type} | {props.location}
            </Typography>
          </Grid>
          <Grid item>
            <Box mt={1.5}>
              <Button onClick={props.open} variant="outlined">
                Check
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
