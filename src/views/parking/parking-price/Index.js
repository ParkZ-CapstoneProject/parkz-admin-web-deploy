import React, { useEffect, useState } from "react";
import MyParkingPrice from "./ParkingPrice";
import * as signalR from "@microsoft/signalr";

const ParkingPrice = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://parkzwebapiver2-001-site1.ctempurl.com/parkz")
      .build();
    console.log("connection", connection);

    connection
      .start()
      .then(() => console.log("Connection started!"))
      .catch((err) => console.error("Error: ", err));

    connection.on("LoadParkingPrice", () => {
      fetchDataPrice();
    });

    fetchDataPrice();

    return () => {
      connection.stop();
    };
  }, []);

  const token = localStorage.getItem("tokenAdmin");
  const user = localStorage.getItem("admin"); // Set the authentication status here
  const userData = JSON.parse(user);

  const apiUrl = "https://parkzapi.azurewebsites.net/api";

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`, // Replace `token` with your actual bearer token
      "Content-Type": "application/json", // Replace with the appropriate content type
    },
  };

  const fetchDataPrice = async () => {
    setLoading(true);
    const res = await fetch(
      `${apiUrl}/parking-price?ManagerId=${userData}&PageNo=1&PageSize=11`,
      requestOptions
    );

    const data = await res.json();
    console.log("data", data.data);

    setRows(data.data);
    setLoading(false);
  };

  return (
    <>
      <MyParkingPrice rows={rows} loading={loading} />
    </>
  );
};

export default ParkingPrice;
