import * as React from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainCard from "ui-component/cards/MainCard";
import SearchSection from "ui-component/search-section";
import { Avatar, Chip, Grid, Skeleton, Typography } from "@mui/material";
// import Menu from "ui-component/staff/Menu";
import CreateButton from "ui-component/buttons/create-button/CreateButton";
import SubCardStaff from "ui-component/cards/SubCardStaff";
import { useDispatch } from "react-redux";
import { openModal } from "store/modalReducer";
import CreateModalStaff from "ui-component/modal/staff-modal/create-modal/CreateModalStaff";
import * as signalR from "@microsoft/signalr";
import { useState } from "react";
import SubCard from "ui-component/cards/SubCard";
import Loading from "ui-component/back-drop/Loading";
import { ImFilesEmpty } from "react-icons/im";
import Menu from "ui-component/business/Menu";

const renderAvatarCell = (params) => {
  return (
    <>
      {params.value ? (
        <Avatar src={params.value} alt="avatar" />
      ) : (
        <Avatar src="https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" />
      )}
    </>
  );
};

const getCellValue = (params) => {
  return params.value ? params.value : "-------";
};

const columns = [
  {
    field: "businessProfileId",
    headerName: "ID",
    width: 170,
    valueGetter: getCellValue,
  },
  {
    field: "name",
    headerName: "Tên doanh nghiệp",
    description: "This column has a value getter and is not sortable.",
    // sortable: false,
    width: 400,
    valueGetter: (params) => `${params.row.name || ""}`,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    width: 800,
    valueGetter: getCellValue,
  },
  {
    field: "action",
    headerName: "",
    width: 120,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => <Menu value={params.value} id={params.id} />,
  },
];

export default function MyBusiness(props) {
  const { rows, loading } = props;

  const dispatch = useDispatch();

  if (loading) {
    // Render the Skeleton components or any other loading indicator
    return (
      <>
        <MainCard title={"Doanh nghiệp"}>
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

  const handleOpenModalCreate = (modalType) => {
    dispatch(openModal(modalType));
  };

  return (
    <>
      <MainCard title={"Doanh nghiệp"}>
        <Grid item xs={12}>
          <SubCardStaff
            startComponent={<SearchSection />}
            endComponent={
              <CreateButton
                onClick={() => handleOpenModalCreate("createModalStaff")}
              />
            }
          ></SubCardStaff>
        </Grid>
        {rows ? (
          <div style={{ height: "500px", width: "100%" }}>
            <DataGrid
              rows={rows}
              rowHeight={70}
              getRowId={(row) => row.businessProfileId}
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

      <CreateModalStaff modalType="createModalStaff" />
    </>
  );
}
