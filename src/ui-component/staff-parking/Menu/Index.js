import { IconButton, List, ListItem, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useNavigate } from "react-router";

const Menu = ({ parkingId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    console.log("parkingId", parkingId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // dispatch(openModal());
  };

  const handleApprove = () => {
    navigate(`/new-request/${parkingId}`);
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
          {/* <ListItem onClick={() => handleOpenModalEdit("modalStaffEdit")}>
            <EditIcon sx={{ marginRight: "3%", color: "#2196f3" }} />
            <Typography color="primary" variant="subtitle1">
              Chỉnh sửa
            </Typography>
          </ListItem> */}
          <ListItem onClick={handleApprove}>
            <AddBoxIcon sx={{ marginRight: "3%", color: "#673ab7" }} />
            <Typography color="secondary" variant="subtitle1">
              Tạo yêu cầu
            </Typography>
          </ListItem>
          {/* <ListItem onClick={handleOpenModalDelete}>
            <DeleteIcon sx={{ marginRight: "3%", color: "#f44336" }} />
            <Typography color="error" variant="subtitle1">
              Vô hiệu hóa
            </Typography>
          </ListItem> */}
        </List>
      </Popover>
    </>
  );
};

export default Menu;
