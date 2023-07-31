import { Grid } from "@mui/material";
import React from "react";
import CreateButton from "ui-component/buttons/create-button/CreateButton";
import MainCard from "ui-component/cards/MainCard";
import SubCardStaff from "ui-component/cards/SubCardStaff";
import ParkingImage from "ui-component/parking/parking-images/ParkingImage";

const SingleParkingImage = () => {
  return (
    <>
      <MainCard title={"Hình ảnh bãi xe"}>
        {/* <Grid item xs={12}>
          <SubCardStaff
            startComponent=""
            endComponent={
              <CreateButton
              onClick={() => handleOpenModalCreate("createModalStaff")}
              />
            }
          >
            <SearchSection />
          </SubCardStaff>
        </Grid> */}
        {/* <CreateButton /> */}
        {/* <CreateButton /> */}
        <ParkingImage />
      </MainCard>
    </>
  );
};

export default SingleParkingImage;
