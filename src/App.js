import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  Grid,
  CircularProgress,
  Box,
  Button
} from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header/index";
import SearchBar from "./components/Searchbar/index";
import JobCard from "./components/Job/JobCard";
import JobModal from "./components/Job/JobModal";
import { firestore, app } from "./firebase/config";
import { Close as CloseIcon } from "@material-ui/icons";
import ViewJobModal from "./components/Job/ViewJobModal";
const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobModal, setJobModal] = useState(false);
  const [customSearch, setCustomSearch] = useState(false);
  const [viewJobModal, setViewJobModal] = useState({});

  const fetchJobs = async () => {
    setLoading(true);
    setCustomSearch(false);
    const req = await firestore
      .collection("Jobs")
      .orderBy("postedOn", "desc")
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate()
    }));
    setJobs(tempJobs);
    setLoading(false);
  };
  const fetchJobsCustom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore
      .collection("Jobs")
      .orderBy("postedOn", "desc")
      .where("location", "==", jobSearch.location)
      .where("type", "==", jobSearch.type)
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate()
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const postJob = async (jobDetails) => {
    await firestore.collection("Jobs").add({
      ...jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp()
    });
    fetchJobs();
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Header openJobModal={() => setJobModal(true)} />
      <JobModal
        closeJobModal={() => setJobModal(false)}
        jobModal={jobModal}
        postJob={postJob}
      />
      <ViewJobModal job={viewJobModal} closeJob={() => setViewJobModal({})} />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={10}>
          <SearchBar fetchJobsCustom={fetchJobsCustom} />
        </Grid>

        <Grid item xs={10}>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              {customSearch && (
                <Box display="flex" justifyContent="flex-end" my={2}>
                  <Button onClick={fetchJobs}>
                    <CloseIcon size={20} />
                    Custom search
                  </Button>
                </Box>
              )}
              {jobs.map((job) => (
                <JobCard
                  open={() => setViewJobModal(job)}
                  key={job.id}
                  {...job}
                />
              ))}
            </>
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
