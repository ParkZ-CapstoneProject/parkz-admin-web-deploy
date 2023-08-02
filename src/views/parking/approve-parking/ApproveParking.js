import React, { useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import { useLocation, useNavigate, useParams } from "react-router";
import { Grid } from "@mui/material";
import SaveButton from "ui-component/buttons/save-button/SaveButton";
import ApproveParkingDetail from "ui-component/parking/approve-parking/parking-detail/ApproveParkingDetail";
import FloorParking from "ui-component/parking/approve-parking/physical-modal-parking/FloorParking";
import RealInformation from "ui-component/parking/approve-parking/real-information/RealInfomation";
import Tabs from "ui-component/parking/approve-parking/Tabs";
import Swal from "sweetalert2";

const ApproveParking = () => {
  const { approveParkingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { parkingId } = location.state;
  console.log("approveParkingId", approveParkingId);
  console.log("parkingId", parkingId);
  const tabs = [
    {
      label: "Thông tin bãi",
      component: <ApproveParkingDetail parkingId={parkingId} />,
    },
    {
      label: "Thông tin sa bàn",
      component: <FloorParking parkingId={parkingId} />,
    },
    {
      label: "Thông tin thực địa",
      component: <RealInformation approveParkingId={approveParkingId} />,
    },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  // Function to handle radio button change
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("tokenAdmin");

  const handleSave = async () => {
    const { value: text } = await Swal.fire({
      title: selectedOption === "approve" ? "Duyệt" : "Từ chối",
      input: "textarea",
      inputPlaceholder: "Nhập ghi chú",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
      confirmButtonText: selectedOption === "approve" ? "Duyệt" : "Từ chối",
      confirmButtonColor: selectedOption === "approve" ? "#7066e0" : "#eb0c38",
      cancelButtonText: "Hủy",
      preConfirm: (inputText) => {
        if (!inputText) {
          Swal.showValidationMessage("Vui lòng nhập ghi chú");
        }
        return inputText;
      },
    });

    const body = {
      approveParkingId: approveParkingId,
      noteForAdmin: text,
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(body),
    };

    let response;

    if (selectedOption === "approve") {
      response = await fetch(
        `${apiUrl}/approve-parkings/request/accept`,
        requestOptions
      );
    } else {
      response = await fetch(
        `${apiUrl}/approve-parkings/request/decline`,
        requestOptions
      );
    }

    if (response.status === 204) {
      Swal.fire({
        icon: "success",
        text: "Thành công",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/pending");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        text: "Bãi xe đã được duyệt/từ chối",
      });
    }
  };

  return (
    <>
      <MainCard title="Duyệt bãi xe">
        <div>
          <Tabs tabs={tabs} />
        </div>
      </MainCard>

      <Grid
        container
        sx={{
          backgroundColor: "#fff",
          marginTop: "15px",
          borderRadius: "12px",
          padding: "10px",
        }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <div className="radio-check">
            <form>
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="approve"
                  checked={selectedOption === "approve"}
                  onChange={handleRadioChange}
                />
                <span>Duyệt</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="reject"
                  checked={selectedOption === "reject"}
                  onChange={handleRadioChange}
                />
                <span>Từ chối</span>
              </label>
            </form>
          </div>
        </Grid>
        <Grid item>
          <SaveButton onClick={handleSave} />
        </Grid>
      </Grid>
    </>
  );
};

export default ApproveParking;
