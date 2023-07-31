import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import ParkingLocation from "./ParkingLocation";

const LeftItem = ({ data }) => {
  const theme = useTheme();
  // const [markerPosition, setMarkerPosition] = useState(null);

  // useEffect(() => {
  //   if (data) {
  //     const { latitude, longitude } = data;
  //     setMarkerPosition([latitude, longitude]);
  //   }
  // }, [data]);

  // if (!data) {
  //   // Render a loading indicator if data is not loaded yet
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Grid container direction="column" spacing={5}>
        <Grid item container direction="row" justifyContent="space-around">
          <Grid item xs={6}>
            <Typography color={theme.palette.primary.main} variant="h3">
              Tên bãi
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color={theme.palette.common.black} variant="h4">
              {data?.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography color={theme.palette.primary.main} variant="h3">
            Địa chỉ
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={theme.palette.common.black} variant="h4">
            {data?.address}
          </Typography>
        </Grid>
        {/* {markerPosition && (
          <Grid item xs={3}>
            <ParkingLocation markerPosition={markerPosition} />
          </Grid>
        )} */}
      </Grid>
    </>
  );
};

export default LeftItem;
