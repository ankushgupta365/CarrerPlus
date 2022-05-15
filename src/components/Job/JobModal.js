import React, { useState } from "react";
import {
  Box,
  Grid,
  FilledInput,
  makeStyles,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  CircularProgress
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  skillChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    fontWeight: "600",
    border: `1px solid ${theme.palette.secondary.main}`,
    cursor: "pointer",
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff"
    }
  },
  included: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff"
  }
}));
const initstate = {
  title: "",
  type: "Full time",
  companyName: "",
  companyUrl: "",
  location: "Remote",
  link: "",
  description: "",
  skills: []
};

export default (props) => {
  const [loading, setLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState(initstate);

  const handlechange = (e) => {
    e.persist();
    setJobDetails((oldState) => {
      return { ...oldState, [e.target.name]: e.target.value };
    });
  };
  const closeModal = () => {
    setJobDetails(initstate);
    setLoading(false);
    props.closeJobModal();
  };
  const addRemoveSkill = (skill) => {
    jobDetails.skills.includes(skill)
      ? setJobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.filter((s) => s !== skill)
        }))
      : setJobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.concat(skill)
        }));
  };

  const handleSubmit = async () => {
    for (const field in jobDetails) {
      if (typeof (jobDetails[field] === "string") && !jobDetails[field]) return;
    }
    if (!jobDetails.skills.length) return;
    setLoading(true);
    await props.postJob(jobDetails);
    closeModal();
  };
  const skills = [
    "Javascript",
    "React",
    "Node",
    "Vue",
    "Firebase",
    "MongoDB",
    "SQL"
  ];
  const classes = useStyles();

  return (
    <Dialog open={props.jobModal} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Post Job
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FilledInput
              autoComplete="off"
              name="title"
              value={jobDetails.title}
              placeholder="Job title *"
              disableUnderline
              fullWidth
              onChange={(e) => handlechange(e)}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              autoComplete="off"
              disableUnderline
              variant="filled"
              name="type"
              value={jobDetails.type}
              fullWidth
              onChange={(e) => handlechange(e)}
            >
              <MenuItem value="Full time">Full time</MenuItem>
              <MenuItem value="Internship">Internship</MenuItem>
              <MenuItem value="Parttime">Part time</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              autoComplete="off"
              name="companyName"
              value={jobDetails.companyName}
              placeholder="Company Name *"
              disableUnderline
              fullWidth
              onChange={(e) => handlechange(e)}
            />
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              autoComplete="off"
              name="companyUrl"
              value={jobDetails.companyUrl}
              placeholder="Company URL *"
              disableUnderline
              fullWidth
              onChange={(e) => handlechange(e)}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              autoComplete="off"
              name="location"
              value={jobDetails.location}
              disableUnderline
              variant="filled"
              onChange={(e) => handlechange(e)}
              fullWidth
            >
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="In-office">In-office</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              autoComplete="off"
              name="link"
              value={jobDetails.link}
              placeholder="Job link *"
              disableUnderline
              fullWidth
              onChange={(e) => handlechange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <FilledInput
              autoComplete="off"
              name="description"
              value={jobDetails.description}
              placeholder="Job Description *"
              disableUnderline
              fullWidth
              multiline
              rows={4}
              onChange={(e) => handlechange(e)}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography>Skills</Typography>
          <Box display="flex">
            {skills.map((skill) => (
              <Box
                onClick={() => addRemoveSkill(skill)}
                className={`${classes.skillChip} ${
                  jobDetails.skills.includes(skill) && classes.included
                }`}
                key={skill}
              >
                {skill}
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          color="red"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption">*Required fields</Typography>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disableElevations
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : (
              "Post Job"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
