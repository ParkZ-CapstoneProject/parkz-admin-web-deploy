import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "ui-component/back-drop/Loading";
import * as signalR from "@microsoft/signalr";
// import MyParkingPending from "./ParkingPending";
import { useParams } from "react-router";
import AllApproveParking from "./AllApproveParking";

const ApproveParking = () => {
  const { id } = useParams();
  // console.log("businessId", businessId);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("tokenAdmin");
  // const user = localStorage.getItem("admin"); // Set the authentication status here
  // const userData = JSON.parse(user);

  //   useEffect(() => {
  //     const connection = new signalR.HubConnectionBuilder()
  //       .withUrl("http://parkzwebapiver2-001-site1.ctempurl.com/parkz")
  //       .build();

  //     connection
  //       .start()
  //       .then(() => console.log("Connection started!"))
  //       .catch((err) => console.error("Error: ", err));

  //     connection.on("LoadApproveParkingList", () => {
  //       fetchData();
  //     });

  //     fetchData();

  //     return () => {
  //       connection.stop();
  //     };
  //   }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`, // Replace `token` with your actual bearer token
      "Content-Type": "application/json", // Replace with the appropriate content type
    },
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `${apiUrl}/approve-parkings/all-field-information/${id}`,
      requestOptions
    );
    const data = await response.json();
    setRows(data.data);
    setLoading(false);
  };

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <>
      <AllApproveParking rows={rows} id={id} />
    </>
  );
};

export default ApproveParking;
