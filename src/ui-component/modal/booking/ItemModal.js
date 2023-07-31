import { Avatar, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AcceptButton from "ui-component/buttons/accept-button/AcceptButton";
import CancelButton from "ui-component/buttons/simple-cancel-button/CancelButton";
import DialogBooking from "../booking/Dialog";
import { closeModal } from "store/modalReducer";
import GridItem from "./GridItem";

const ItemModal = ({ modalType }) => {
  const theme = useTheme();
  const { accept, checkIn, checkOut, cancel } = useSelector(
    (state) => state.modal
  );

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal(modalType));
  };
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (e) => {
    e.preventDefault();
    if (!openDialog) {
      setOpenDialog(true);
    }
  };

  return (
    <>
      <Grid container direction="row">
        <Grid
          item
          container
          xs={5}
          direction="column"
          spacing={2}
          justifyContent="center"
          sx={{ marginLeft: "1%", marginTop: "4%" }}
        >
          <Grid item sx={{ textAlign: "center" }}>
            <Typography color={theme.palette.primary.main} variant="h2">
              Thông tin chi tiết
            </Typography>
          </Grid>
          <Grid item container direction="row" justifyContent="space-between">
            <GridItem title="Mã" value="123" />
          </Grid>

          <Grid item sx={{ marginTop: "2%" }}>
            <Typography color={theme.palette.primary.secondary} variant="h3">
              Hồ sơ
            </Typography>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <GridItem title="Người đặt" value="Ngọc Hương" />
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <GridItem title="SĐT" value="0234125123" />
          </Grid>

          <Grid item sx={{ marginTop: "2%" }}>
            <Typography color={theme.palette.primary.secondary} variant="h3">
              Người được đặt hộ
            </Typography>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <GridItem title="Tên KH" value="Ngọc Hương" />
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <GridItem title="SĐT" value="0234125123" />
          </Grid>

          <Grid item sx={{ marginTop: "2%" }}>
            <Typography color={theme.palette.primary.secondary} variant="h3">
              Thông tin xe
            </Typography>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <GridItem title="Phương tiện" value="Mercedes-Benz SUV" />
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <GridItem title="Biển số xe" value="60A - 12345" />
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <GridItem title="Loại xe" value="Ô tô" />
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <GridItem title="Màu xe" value="Đen" />
          </Grid>

          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            sx={{ marginTop: "6%" }}
          >
            <Grid item>
              <Typography
                color={theme.palette.common.black}
                variant="h3"
                sx={{ fontSize: "25px" }}
              >
                Số tiền
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                color={theme.palette.common.black}
                variant="h3"
                sx={{ fontSize: "25px" }}
              >
                20,000VNĐ
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="column"
          xs={5}
          alignItems="center"
          sx={{ marginLeft: "10%", marginTop: "4%" }}
          spacing={2}
        >
          <Grid item>
            <Avatar
              alt="avatar"
              src="https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_1280.png"
              variant="rounded"
              sx={{
                width: "250px",
                height: "250px",
                marginTop: "5%",
                borderRadius: "15px",
              }}
            />
          </Grid>
          <Grid item>
            <Typography
              color={theme.palette.primary.secondary}
              variant="h3"
              sx={{ paddingTop: "20px", paddingBottom: "20px" }}
            >
              Thông tin đơn
            </Typography>
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <GridItem title="Bãi xe" value="Bãi xe Hoàng Văn Thụ" />
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <GridItem title="Ngày đặt" value="11-04-2023" />
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <GridItem title="Giờ vào" value="7:00 AM" />
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <GridItem title="Giờ ra" value="10:00 AM" />
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <GridItem title="Vị trí" value="A1" />
          </Grid>

          <Grid item container direction="row" justifyContent="space-between">
            <GridItem title="Tầng" value="1" />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-end"
        sx={{ marginTop: "10%" }}
      >
        <Grid item>
          <CancelButton onClick={handleCloseModal} />
        </Grid>
        <Grid item>
          {accept === true && (
            <AcceptButton value="Chấp nhận" onClick={handleOpenDialog} />
          )}
          {checkIn === true && (
            <AcceptButton value="Check in" onClick={handleOpenDialog} />
          )}
          {checkOut === true && (
            <AcceptButton value="Check out" onClick={handleOpenDialog} />
          )}
          {cancel === true && (
            <AcceptButton value="Hủy đơn" onClick={handleOpenDialog} />
          )}
        </Grid>
      </Grid>

      <DialogBooking open={openDialog} modalType={modalType} />
    </>
  );
};

export default ItemModal;
