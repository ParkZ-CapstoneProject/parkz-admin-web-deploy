import { IconButton, List, ListItem, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import CreateModal from "ui-component/modal/staff-parking/create/CreateModal";

const Menu = ({ approveParkingId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    // console.log("parkingId", parkingId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // dispatch(openModal());
  };

  const handleEdit = () => {
    setIsOpen(true);
    setIsEdit(true);
  };

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
        <List sx={{ width: "140px" }}>
          <ListItem onClick={handleEdit}>
            <EditIcon sx={{ marginRight: "3%", color: "#2196f3" }} />
            <Typography color="primary" variant="subtitle1">
              Chỉnh sửa
            </Typography>
          </ListItem>
          {/* <ListItem onClick={handleApprove}>
            <AddBoxIcon sx={{ marginRight: "3%", color: "#673ab7" }} />
            <Typography color="secondary" variant="subtitle1">
              Tạo yêu cầu
            </Typography>
          </ListItem> */}
          {/* <ListItem onClick={handleOpenModalDelete}>
            <DeleteIcon sx={{ marginRight: "3%", color: "#f44336" }} />
            <Typography color="error" variant="subtitle1">
              Vô hiệu hóa
            </Typography>
          </ListItem> */}
        </List>
      </Popover>

      <CreateModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isEdit={isEdit}
        approveParkingId={approveParkingId}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
};

export default Menu;
