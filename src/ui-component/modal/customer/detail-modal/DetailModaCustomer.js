import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@mui/material/styles";
import ItemModal from "./ItemModal";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  overFlow: "auto",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "77%",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 12,
  p: 4,
};

export default function DetailModalCustomer(props) {
  const { isOpenDetail, setIsOpenDetail, id } = props;
  const theme = useTheme();

  const handleClose = () => {
    setIsOpenDetail(false);
  };

  return (
    <div>
      {/* <Button onClick={() => handleOpen("createModalStaff")}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpenDetail}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{ border: "none" }}
      >
        <Fade in={isOpenDetail}>
          <Box sx={style}>
            <IconButton
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 1,
                right: 1,
                color: theme.palette.grey[500],
                backgroundColor: theme.palette.grey[100],
              }}
            >
              <CloseIcon />
            </IconButton>
            <ItemModal setIsOpenDetail={setIsOpenDetail} id={id} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
