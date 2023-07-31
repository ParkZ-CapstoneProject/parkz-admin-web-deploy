import React, { useEffect, useState } from "react";
import MyCustomer from "./Customer";
import * as signalR from "@microsoft/signalr";

const Customer = () => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("tokenAdmin");

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://parkzwebapiver2-001-site1.ctempurl.com/parkz")
      .build();
    console.log("connection", connection);

    connection
      .start()
      .then(() => console.log("Connection started!"))
      .catch((err) => console.error("Error: ", err));

    connection.on("LoadKeeperAccounts", () => {
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
      `${apiUrl}/accounts/customer?pageNo=1&pageSize=22`,
      requestOptions
    );
    const data = await response.json();
    setRows(data.data);
    setLoading(false);
  };
  return <MyCustomer rows={rows} loading={loading} />;
};

export default Customer;
