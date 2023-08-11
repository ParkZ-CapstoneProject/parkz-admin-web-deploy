import React, { useEffect, useState } from "react";
import MyBusiness from "./Business";
import * as signalR from "@microsoft/signalr";

const Business = () => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("tokenAdmin");
  const signalRUrl = "https://parkzserver-001-site1.btempurl.com/parkz";

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${signalRUrl}`)
      .build();
    console.log("connection", connection);

    connection
      .start()
      .then(() => console.log("Connection started!"))
      .catch((err) => console.error("Error: ", err));

    connection.on("LoadBusinessProfileInAdmin", () => {
      fetchData();
    });

    fetchData();

    return () => {
      connection.stop();
    };
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
      `${apiUrl}/business-profile-management?pageNo=1&pageSize=11`,
      requestOptions
    );
    const data = await response.json();
    setRows(data.data);
    setLoading(false);
  };
  return <MyBusiness rows={rows} loading={loading} />;
};

export default Business;
