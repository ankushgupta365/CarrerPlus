import React from "react";
import { Box, Grid, Typography, Button } from "@material-ui/core";

const Header = (props) => (
  <Box p={4} bgcolor="secondary.main" color="white">
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={10}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4">Career Plus</Typography>
          <Button
            onClick={props.openJobModal}
            variant="contained"
            disableElevation
            color="primary"
          >
            Post a Job
          </Button>
        </Box>
      </Grid>
    </Grid>
  </Box>
);
export default Header;
