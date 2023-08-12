import React, { useState, useEffect } from "react";
import DataTable from "./Booking";

const Booking = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("tokenAdmin");

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
      `${apiUrl}/admin/booking-management?pageNo=1&pageSize=300`,
      requestOptions
    );
    const data = await response.json();
    setRows(data.data);
    console.log("data.data", data.data);
    setLoading(false);
  };

  return (
    <>
      <DataTable rows={rows} loading={loading} />
    </>
  );
};

export default Booking;
