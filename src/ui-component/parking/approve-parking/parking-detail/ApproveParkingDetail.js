import React, { useEffect, useState } from "react";
import { Chip, Grid, Rating, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Loading from "ui-component/back-drop/Loading";

const ApproveParkingDetail = (props) => {
  const { parkingId } = props;
  const theme = useTheme();
  const [data, setData] = useState(null);

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("tokenAdmin");
  const [loading, setLoading] = useState(false);

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
      `${apiUrl}/approve-parkings/parking-information-tab/${parkingId}`,
      requestOptions
    );

    const data = await response.json();
    console.log("data", data.data);
    setData(data.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <>
      <Grid container direction="row" spacing={4}>
        <Grid item container direction="column" spacing={3} xs={6}>
          <Grid item>
            <Typography color={theme.palette.primary.main} variant="h2">
              Thông tin doanh nghiệp
            </Typography>
          </Grid>
          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="h4">
                Mã doanh nghiệp
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="subtitle1">
                {data?.parkingId}
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <Typography color={theme.palette.primary.main} variant="h2">
              Thông tin bãi xe
            </Typography>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="h4">
                Trạng thái
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={data?.approveParkingStatus}
                color="primary"
                sx={{ fontWeight: 600, fontSize: "15px" }}
              />
            </Grid>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="h4">
                Đánh giá
              </Typography>
            </Grid>
            <Grid item>
              {data?.stars ? (
                <Rating value={data?.stars} readOnly />
              ) : (
                <Typography
                  color={theme.palette.common.dark}
                  variant="subtitle1"
                >
                  Chưa có đánh giá
                </Typography>
              )}
            </Grid>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="h4">
                Mô tả
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="subtitle1">
                {data?.description}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="h4">
                Địa chỉ
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="subtitle1">
                {data?.address}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="column"
          spacing={3}
          xs={6}
          sx={{ marginTop: "25px" }}
        >
          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="h4">
                Tên doanh nghiệp
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="subtitle1">
                {data?.businessName}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            sx={{ marginTop: "63px" }}
          >
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="h4">
                Tình trạng trống
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label="Còn trống"
                color="success"
                sx={{ color: "#fff", fontWeight: 600, fontSize: "15px" }}
              />
            </Grid>
          </Grid>
          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="h4">
                Số tầng
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="subtitle1">
                {data?.totalFloor}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="h4">
                Tổng vị trí
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="subtitle1">
                {data?.carSpot}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="h4">
                Gói cước
              </Typography>
            </Grid>
            <Grid item>
              <Typography color={theme.palette.common.dark} variant="subtitle1">
                {data?.parkingPrices}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Typography
        color={theme.palette.primary.main}
        variant="h2"
        sx={{ margin: "25px 0 50px 0" }}
      >
        Hình ảnh
      </Typography>

      {data?.images ? (
        <Grid container direction="row" spacing={5}>
          {data?.images.map((url, index) => {
            return (
              <Grid item key={index}>
                <img
                  src={url}
                  alt=""
                  style={{
                    borderRadius: "10px",
                    width: "300px",
                    height: "180px",
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
};

export default ApproveParkingDetail;
