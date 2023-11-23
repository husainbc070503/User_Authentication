import { Grid, Typography } from "@mui/material";
import React from "react";

const Details = ({ title, value }) => {
  return (
    <Grid container spacing={2} alignItems="center" mb={4}>
      <Grid item md={2}>
        <Typography fontWeight="bold" color="CaptionText" fontSize={24}>
          {title}:
        </Typography>
      </Grid>
      <Grid item md={10}>
        <Typography fontSize={24}>{value}</Typography>
      </Grid>
    </Grid>
  );
};

export default Details;
