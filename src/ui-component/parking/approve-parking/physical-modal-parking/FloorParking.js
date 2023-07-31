import { Grid, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loading from "ui-component/back-drop/Loading";
import PhysicalModal from "./PhysicalModal";

const FloorParking = (props) => {
  const { parkingId } = props;
  const [currentFloor, setCurrentFloor] = useState(0);
  //   const [edit, setEdit] = useState(false);

  //   const dispatch = useDispatch();
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
    const token = localStorage.getItem("tokenAdmin");

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const fetchCarSlots = async (floor) => {
      setLoading(true);
      const response = await fetch(
        `${apiUrl}/parkingSlot/floor/${floor.floorId}`,
        requestOptions
      );
      const data = await response.json();
      console.log("data slots: ", data.data);
      // console.log("data slots", data);
      return data.data;
    };

    const fetchFloors = async () => {
      const response = await fetch(
        `${apiUrl}/floors/parking/${parkingId}`,
        requestOptions
      );
      const data = await response.json();
      const fetchedFloors = data.data;
      // console.log("fetchedFloors", fetchedFloors);

      // Fetch car slots for each floor
      const updatedFloors = await Promise.all(
        fetchedFloors.map(async (floor) => {
          const carSlots = await fetchCarSlots(floor);
          return { ...floor, carSlots };
        })
      );

      setFloors(updatedFloors);
      setLoading(false);
    };

    fetchFloors();
  }, [parkingId]);

  const handleTabChange = (event, newValue) => {
    event.preventDefault();
    setCurrentFloor(newValue);
  };

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ marginTop: "25px" }}
      >
        {/* <EditButton onClick={handleEdit} /> */}
      </Grid>
      <Tabs
        value={currentFloor}
        onChange={handleTabChange}
        variant="fullWidth"
        aria-label="Parking Floors"
      >
        {floors?.map((floor, index) => (
          <Tab key={floor.floorId} label={floor.floorName} />
        ))}
      </Tabs>
      {floors?.length > 0 ? (
        <PhysicalModal
          floorIndex={floors[currentFloor].floorId}
          listCarSlots={floors[currentFloor].carSlots}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default FloorParking;
