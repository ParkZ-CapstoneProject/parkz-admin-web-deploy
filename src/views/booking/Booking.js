import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import SearchSection from "ui-component/search-section";
import SubCard from "ui-component/cards/SubCard";
import { Avatar, Chip, Grid, Skeleton } from "@mui/material";
import Menu from "ui-component/booking/Menu";
import Loading from "ui-component/back-drop/Loading";
import { useRef } from "react";
import { useEffect } from "react";
// import Loading from "ui-component/back-drop/Loading";

const renderAvatarCell = (params) => {
  return params.value ? (
    <Avatar src={params.value} alt="avatar" />
  ) : (
    <Avatar
      src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
      alt="avatar"
    />
  );
};

const renderCellStatus = (params) => {
  const statusMap = {
    Initial: { label: "Khởi tạo", color: "#fff", bgColor: "gray" },
    Done: { label: "Hoàn thành", color: "#fff", bgColor: "#4caf50" },
    OverTime: { label: "Quá hạn", color: "#fff", bgColor: "#1976d2" },
    Check_In: { label: "Check in", color: "#fff", bgColor: "#f44336" },
    Check_Out: { label: "Check out", color: "#000", bgColor: "#ff9800" },
    Success: { label: "Thành công", color: "#fff", bgColor: "#2196f3" },
    Cancel: { label: "Hủy bỏ", color: "#fff", bgColor: "#f44336" },
  };

  const { value } = params;
  const statusStyle = statusMap[value] || {
    label: value,
    color: "inherit",
    bgColor: "gray",
  };

  return (
    <Chip
      label={statusStyle.label}
      sx={{
        backgroundColor: statusStyle.bgColor,
        color: statusStyle.color,
        padding: "5px",
      }}
    />
  );
};

const columns = [
  {
    field: "bookingId",
    headerName: "ID",
    width: 70,
    valueGetter: (params) => `${params.row.bookingDtoForAdmin.bookingId}`,
  },
  {
    field: "avatar",
    headerName: "Ảnh",
    width: 80,
    renderCell: renderAvatarCell,
    sortable: false,
    valueGetter: (params) =>
      `${
        params.row.userForGetAllBookingForAdminResponse.avatar ? (
          <Avatar
            src={params.row.userForGetAllBookingForAdminResponse.avatar}
          />
        ) : (
          <Avatar
            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
            alt="avatar"
          />
        )
      }`,
  },
  {
    field: "name",
    headerName: "Tên khách hàng",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
    valueGetter: (params) =>
      `${params.row.userForGetAllBookingForAdminResponse.name || "----"}`,
  },
  {
    field: "floorName",
    headerName: "Tầng",
    width: 120,
    valueGetter: (params) =>
      `${params.row.floorDtoForAdmin.floorName || "----"}`,
  },
  {
    field: "slotsName",
    headerName: "Vị trí",
    width: 120,
    valueGetter: (params) => `${params.row.slotDtoForAdmin.name || "----"}`,
  },
  {
    field: "totalPrice",
    headerName: "Giá",
    // type: "number",
    width: 100,
    valueGetter: (params) =>
      `${params.row.bookingDtoForAdmin.totalPrice || "----"}`,
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 130,
    valueGetter: (params) =>
      `${params.row.userForGetAllBookingForAdminResponse.phone || "----"}`,
  },
  {
    field: "parkingDtoForAdmin.name",
    headerName: "Bãi xe",
    width: 200,
    valueGetter: (params) => `${params.row.parkingDtoForAdmin.name || "----"}`,
  },
  {
    field: "checkInTime",
    headerName: "Giờ vào",
    width: 120,
    valueGetter: (params) =>
      `${params.row.bookingDtoForAdmin.checkInTime || "----"}`,
  },
  {
    field: "checkOutTime",
    headerName: "Giờ ra",
    width: 120,
    valueGetter: (params) =>
      `${params.row.bookingDtoForAdmin.checkOutTime || "----"}`,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 120,
    valueGetter: (params) =>
      `${params.row.bookingDtoForAdmin.status || "----"}`,
    renderCell: renderCellStatus,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "action",
    headerName: "",
    width: 70,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
    renderCell: (params) => <Menu id={params.id} />,
  },
];

export default function DataTable(props) {
  const { rows, loading } = props;
  const dataGridRef = useRef(null);

  useEffect(() => {
    if (dataGridRef.current) {
      // get the height of the DataGrid using the ref
      const height = dataGridRef.current.clientHeight;
      // set the height of the outer div to be the same as the DataGrid height
      document.getElementById("outer-div").style.height = `${height}px`;
    }
  }, [rows]);

  if (loading) {
    // Render the Skeleton components or any other loading indicator
    return (
      <>
        <MainCard title={"Lịch đặt"}>
          <Grid item xs={12}>
            <SubCard>
              {/* Render the Skeleton components for the search section */}
              <Skeleton animation="wave" height={40} width={200} />
            </SubCard>
          </Grid>
          <div style={{ height: "500px", width: "100%" }}>
            {/* Render the Skeleton components for the data grid */}
            <Skeleton animation="wave" height={400} />
          </div>
        </MainCard>
        <Loading loading={loading} />
      </>
    );
  }

  return (
    <>
      <MainCard title={"Lịch đặt"}>
        <Grid item xs={12}>
          <SubCard>
            <SearchSection />
          </SubCard>
        </Grid>
        <div id="outer-div">
          <DataGrid
            rows={rows}
            rowHeight={70}
            getRowId={(row) => row.bookingDtoForAdmin.bookingId}
            autoHeight
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
      </MainCard>
    </>
  );
}
