import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateButton from "ui-component/buttons/create-button/CreateButton";
import FeeCardBus from "ui-component/cards/Fee/FeeCardBus";
import FeeCardPerson from "ui-component/cards/Fee/FeeCardPerson";
import MainCard from "ui-component/cards/MainCard";
import FeeModal from "ui-component/modal/fee-setting/FeeModal";

const Fee = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState([]);

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("tokenAdmin");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`, // Replace `token` with your actual bearer token
      "Content-Type": "application/json", // Replace with the appropriate content type
    },
  };

  const fetchData = async () => {
    const response = await fetch(`${apiUrl}/fee-management`, requestOptions);

    const data = await response.json();
    setData(data.data);
  };

  // console.log("data", data);

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
    setEdit(false);
  };

  return (
    <>
      <MainCard title="Cước phí">
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ paddingBottom: "30px" }}
        >
          <CreateButton onClick={handleOpenModal} />
        </Grid>
        <Grid
          container
          direction="row"
          spacing={15}
          justifyContent="center"
          alignItems="center"
          padding={5}
        >
          <Grid item>
            <FeeCardBus
              setEdit={setEdit}
              setIsOpen={setIsOpen}
              bus={data[0]}
              setId={setId}
            />
          </Grid>
          <Grid item sx={{ marginLeft: "10px" }}>
            <FeeCardPerson
              setEdit={setEdit}
              setIsOpen={setIsOpen}
              setId={setId}
              person={data[1]}
            />
          </Grid>
        </Grid>
      </MainCard>

      <FeeModal isOpen={isOpen} setIsOpen={setIsOpen} edit={edit} id={id} />
    </>
  );
};

export default Fee;
