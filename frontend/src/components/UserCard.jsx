import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Details from "./Details";

const UserCard = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user-details")));
  }, []);

  return (
    <>
      <Typography
        color="secondary"
        fontSize={40}
        fontWeight="bold"
        marginBottom={8}
        textAlign="center"
        marginTop={8}
      >
        Welcome, {user?.user?.name}
      </Typography>
      <Grid
        container
        spacing={3}
        className="Grid user-card"
        alignItems="center"
      >
        <Grid item md={4}>
          <div className="profile-image">
            <img src={user?.user?.avatar} alt={user?.user?.name} />
          </div>
        </Grid>
        <Grid item md={8}>
          <Details title="Name" value={user?.user?.name} />
          <Details title="Email" value={user?.user?.email} />
          <Details title="Phone" value={user?.user?.phone} />
          <Details title="Address" value={user?.user?.address} />
          <Details title="Skills" value={user?.user?.skills.toString()} />
        </Grid>
      </Grid>
    </>
  );
};

export default UserCard;
