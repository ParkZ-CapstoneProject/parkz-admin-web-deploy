import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import SearchSection from "ui-component/search-section";
import { Chip, Grid, Switch, Typography } from "@mui/material";
import Menu from "ui-component/parking/parking-all/Menu";
import Swal from "sweetalert2";
import SubCardStaff from "ui-component/cards/SubCardStaff";
import CreateButton from "ui-component/buttons/create-button/CreateButton";
import { useNavigate } from "react-router";
import { ImFilesEmpty } from "react-icons/im";
import SubCard from "ui-component/cards/SubCard";

export default function MyParkingAll(props) {
  const { rows } = props;

  const navigate = useNavigate();

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("token");

  const getCellValue = (params) => {
    return params.value == null ? false : params.value;
  };

  const handleSwitchToggle = async (params, field) => {
    Swal.fire({
      title: "Xác nhận?",
      text: "Bạn có chắc chắn muốn thay đổi!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Hủy",
      confirmButtonText: "Xác nhận!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (field === "isActive") {
            const requestOptions = {
              method: "DELETE",
              headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json",
              },
            };
            const response = await fetch(
              `${apiUrl}/parkings/parking/${params.id}`,
              requestOptions
            );
            if (response.status === 204) {
              Swal.fire({
                icon: "success",
                text: "Cập nhật trạng thái thành công!",
              });
            } else {
              Swal.fire({
                icon: "error",
                text: "Cập nhật trạng thái thất bạij!",
              });
            }
          }
          // else {
          //   const requestOptions = {
          //     method: "PUT",
          //     headers: {
          //       Authorization: `bearer ${token}`,
          //       "Content-Type": "application/json",
          //     },
          //   };
          //   const response = await fetch(
          //     `${apiUrl}/parkings/parking/full/${params.id}`,
          //     requestOptions
          //   );
          //   console.log("response", response.status);
          //   if (response.status === 204) {
          //     Swal.fire({
          //       icon: "success",
          //       text: "Cập nhật trạng thái thành công!",
          //     });
          //   } else {
          //     Swal.fire({
          //       icon: "error",
          //       text: "Cập nhật trạng thái thất bạij!",
          //     });
          //   }
          // }
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  const renderCellIsActive = (params) => {
    const handleChange = () => {
      handleSwitchToggle(params, "isActive");
    };

    return (
      <Switch checked={params.value} onChange={handleChange} color="primary" />
    );
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
    { field: "parkingId", headerName: "ID", width: 80 },
    {
      field: "name",
      headerName: "Tên bãi",
      description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 280,
      valueGetter: (params) => `${params.row.name || ""}`,
    },
    { field: "address", headerName: "Địa chỉ", width: 400 },
    {
      field: "carSpot",
      headerName: "Vị trí ô tô",
      type: "number",
      width: 210,
      valueGetter: getCellValue,
    },
    {
      field: "isFull",
      headerName: "Tình trạng",
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell: renderCellStatus,
    },
    {
      field: "isActive",
      headerName: "Hoạt động",
      width: 210,
      sortable: false,
      disableColumnMenu: true,
      renderCell: renderCellIsActive,
    },
    {
      field: "action",
      headerName: "",
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => <Menu value={params.value} id={params.id} />,
    },
  ];

  return (
    <>
      <MainCard title={"Tất cả bãi"}>
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
