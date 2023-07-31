import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import SearchSection from "ui-component/search-section";
import { Chip, Grid, Switch, Typography } from "@mui/material";
// import Menu from "ui-component/parking/parking-all/Menu";
import Swal from "sweetalert2";
import SubCardStaff from "ui-component/cards/SubCardStaff";
import CreateButton from "ui-component/buttons/create-button/CreateButton";
import { useNavigate } from "react-router";
import { ImFilesEmpty } from "react-icons/im";
import SubCard from "ui-component/cards/SubCard";
import Menu from "ui-component/staff-parking/Menu/Index";

export default function MyRequestedParking(props) {
  const { rows } = props;

  const getCellValue = (params) => {
    return params.value == null ? false : params.value;
  };

  const renderCellIsActive = (params) => {
    if (params.value === false) {
      return (
        <Chip
          color="success"
          label="Không"
          sx={{ padding: "10px", color: "#fff", fontWeight: "bold" }}
        />
      );
    }
  };

  const renderCellStatus = (params) => {
    if (params.value === true) {
      return (
        <Chip
          color="success"
          label="Đầy"
          sx={{ padding: "10px", color: "#fff", fontWeight: "bold" }}
        />
      );
    } else {
      return (
        <Chip
          color="secondary"
          label="Còn trống"
          sx={{ padding: "8px", color: "#fff", fontWeight: "bold" }}
        />
      );
    }
  };

  const columns = [
    { field: "parkingId", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Tên bãi",
      description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 300,
      valueGetter: (params) => `${params.row.name || ""}`,
    },
    { field: "address", headerName: "Địa chỉ", width: 410 },
    {
      field: "carSpot",
      headerName: "Vị trí ô tô",
      type: "number",
      width: 200,
      valueGetter: getCellValue,
    },
    {
      field: "isFull",
      headerName: "Tình trạng",
      width: 180,
      sortable: false,
      disableColumnMenu: true,
      renderCell: renderCellStatus,
    },
    {
      field: "isActive",
      headerName: "Hoạt động",
      width: 180,
      sortable: false,
      disableColumnMenu: true,
      renderCell: renderCellIsActive,
    },
    {
      field: "action",
      headerName: "",
      width: 80,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => <Menu parkingId={params.id} />,
    },
  ];

  return (
    <>
      <MainCard title={"Tất cả bãi xe yêu cầu duyệt"}>
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
              getRowId={(row) => row.parkingId}
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
