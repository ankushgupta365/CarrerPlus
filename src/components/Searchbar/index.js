import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Button,
  makeStyles,
  CircularProgress
} from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "fff",
    display: "flex",
    boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    "& > *": {
      flex: 1,
      height: "45px",
      margin: "8px"
    }
  }
});

const SearchBar = (props) => {
  const [loading, setLoading] = useState(false);
  const [jobSearch, setJobSearch] = useState({
    type: "Full time",
    location: "Remote"
  });

  const handleChange = (e) => {
    e.persist();
    setJobSearch((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value
    }));
  };
  const classes = useStyles();

  const search = async () => {
    setLoading(true);
    await props.fetchJobsCustom(jobSearch);
    setLoading(false);
  };
  return (
    <Box p={2} mb={0.1} className={classes.wrapper}>
      <Select
        name="type"
        value={jobSearch.type}
        onChange={(e) => handleChange(e)}
        disableUnderline
        variant="filled"
      >
        <MenuItem value="Full time">Full time</MenuItem>
        <MenuItem value="Internship">Internship</MenuItem>
        <MenuItem value="Parttime">Part time</MenuItem>
      </Select>
      <Select
        name="location"
        value={jobSearch.location}
        onChange={(e) => handleChange(e)}
        disableUnderline
        variant="filled"
      >
        <MenuItem value="Remote">Remote</MenuItem>
        <MenuItem value="In-office">In-office</MenuItem>
      </Select>
      <Button
        disabled={loading}
        onClick={search}
        variant="contained"
        disableElevation
        color="primary"
      >
        {loading ? <CircularProgress color="secondary" size={22} /> : "Search"}
      </Button>
    </Box>
  );
};

export default SearchBar;
