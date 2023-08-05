import { IconButton, List, ListItem, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useDispatch } from "react-redux";
import { openModal, setBookingId } from "store/modalReducer";
import ModalBooking from "ui-component/modal/booking/ModalBooking";

const Menu = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(setBookingId(id));
    console.log("id: ", id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // dispatch(openModal());
  };

  const handleOpenModalAccept = (modalType) => {
    // console.log("modalType", modalType);
    // dispatch(setAccept(true));
    // dispatch(setCheckIn(false));
    // dispatch(setCheckOut(false));
    // dispatch(setCancel(false));
    dispatch(openModal(modalType));
  };

  // const handleOpenModalCheckIn = (modalType) => {
  //   dispatch(setAccept(false));
  //   dispatch(setCheckIn(true));
  //   dispatch(setCheckOut(false));
  //   dispatch(setCancel(false));
  //   dispatch(openModal(modalType));
  // };

  // const handleOpenModalCheckOut = (modalType) => {
  //   dispatch(setAccept(false));
  //   dispatch(setCheckIn(false));
  //   dispatch(setCheckOut(true));
  //   dispatch(setCancel(false));
  //   dispatch(openModal(modalType));
  // };

  // const handleOpenModalCancel = (modalType) => {
  //   dispatch(setAccept(false));
  //   dispatch(setCheckIn(false));
  //   dispatch(setCheckOut(false));
  //   dispatch(setCancel(true));
  //   dispatch(openModal(modalType));
  // };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List sx={{ width: "130px" }}>
          <ListItem onClick={() => handleOpenModalAccept("modalBooking")}>
            <RemoveRedEyeIcon sx={{ marginRight: "3%", color: "#2196f3" }} />
            <Typography color="primary" variant="subtitle1">
              Chi tiết
            </Typography>
          </ListItem>
          {/* <ListItem onClick={() => handleOpenModalCheckIn("modalBooking")}>
            <CheckCircleIcon sx={{ marginRight: "3%", color: "#673ab7" }} />
            <Typography color="secondary" variant="subtitle1">
              Check in
            </Typography>
          </ListItem>
          <ListItem onClick={() => handleOpenModalCheckOut("modalBooking")}>
            <ExitToAppIcon sx={{ marginRight: "3%", color: "#ffc107" }} />
            <Typography color="#ffc107" variant="subtitle1">
              Check out
            </Typography>
          </ListItem>
          <ListItem onClick={() => handleOpenModalCancel("modalBooking")}>
            <CancelIcon sx={{ marginRight: "3%", color: "#f44336" }} />
            <Typography color="error" variant="subtitle1">
              Hủy
            </Typography>
          </ListItem> */}
        </List>
      </Popover>

      <ModalBooking modalType="modalBooking" />
    </>
  );
};

export default Menu;
