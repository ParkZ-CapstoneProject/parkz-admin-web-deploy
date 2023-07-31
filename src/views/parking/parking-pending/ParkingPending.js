import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import SearchSection from "ui-component/search-section";
import { Chip, Grid, Switch, Typography } from "@mui/material";
import Swal from "sweetalert2";
import SubCardStaff from "ui-component/cards/SubCardStaff";
import CreateButton from "ui-component/buttons/create-button/CreateButton";
import { useNavigate } from "react-router";
import { ImFilesEmpty } from "react-icons/im";
import SubCard from "ui-component/cards/SubCard";
import Menu from "ui-component/parking-pending/Menu";

export default function MyParkingPending(props) {
  const { rows } = props;

  const navigate = useNavigate();

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("token");

  const getCellValue = (params) => {
    return params.value == null ? false : params.value;
  };

  const renderCellStatus = (params) => {
    if (params.value !== null) {
      return (
        <Chip
          color="success"
          label={params.value}
          sx={{ padding: "10px", color: "#fff", fontWeight: "bold" }}
        />
      );
    }
  };

  const formatDate = (createdDate) => {
    if (createdDate && createdDate.length >= 10) {
      return createdDate.slice(0, 10);
    }
    return "-------";
  };

  const columns = [
    { field: "approveParkingId", headerName: "ID", width: 90 },
    {
      field: "parkingName",
      headerName: "Tên bãi",
      description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 400,
      valueGetter: (params) => `${params.row.parkingName || ""}`,
    },
    { field: "staffName", headerName: "Nhân viên", width: 370 },
    {
      field: "createdDate",
      headerName: "Ngày tạo",
      width: 250,
      valueGetter: (params) => formatDate(params.row.createdDate),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 250,
      sortable: false,
      disableColumnMenu: true,
      renderCell: renderCellStatus,
    },
    {
      field: "action",
      headerName: "",
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Menu id={params.id} parkingId={params.row.parkingId} />
      ),
    },
  ];

  return (
    <>
      <MainCard title={"Bãi xe chờ duyệt"}>
        <Grid item xs={12}>
          <SubCard>
            <SearchSection />
          </SubCard>
        </Grid>

        {rows ? (
          <div style={{ height: "500px", width: "100%" }}>
            <DataGrid
              rows={rows}
              rowHeight={70}
              getRowId={(row) => row.approveParkingId}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              checkboxSelection
              style={{ paddingTop: "12px" }}
            />
          </div>
        ) : (
          <>
            <Typography
              variant="h1"
              color="#21130d"
              sx={{ textAlign: "center", marginTop: "15%" }}
            >
              Không tìm thấy dữ liệu
            </Typography>
            <ImFilesEmpty
              style={{ fontSize: "150px", marginTop: "5%", marginLeft: "46%" }}
            />
          </>
        )}
      </MainCard>
    </>
  );
}
