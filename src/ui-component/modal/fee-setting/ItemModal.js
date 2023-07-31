import React from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import SaveButton from "ui-component/buttons/save-button/SaveButton";
import CancelButton from "ui-component/buttons/cancel-button/CancelButton";
import Swal from "sweetalert2";

const ItemModal = (props) => {
  const { setIsOpen, edit, id } = props;
  console.log("id", id);
  const theme = useTheme();

  const [name, setName] = useState("");
  const [typeBusiness, setTypeBusiness] = useState("Doanh nghiệp");
  const [price, setPrice] = useState(0);

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("token");

  const handleInputPrice = (event) => {
    setPrice(event.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setTypeBusiness(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (name.length === 0 || price === 0) {
      Swal.fire({
        icon: "warning",
        text: "Vui lòng nhập tên phí và giá phí!",
      });
      return;
    }

    Swal.fire({
      title: "Xác nhận?",
      text: "Bạn có chắc chắn muốn lưu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Hủy",
      confirmButtonText: "Xác nhận!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "info",
          title: "Đang xử lý thông tin...",
          text: "Vui lòng chờ trong giây lát!",
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const request = {
          name: name,
        };

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify(request),
        };

        const response = await fetch(
          `${apiUrl}/keeper-account-management/register`,
          requestOptions
        );

        const data = await response.json();

        if (data.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "Tạo mới cước phí thành công",
          }).then((result) => {
            if (result.isConfirmed) {
              setName("");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "Có lỗi khi tạo mới",
          });
        }
      }
    });
  };

  return (
    <>
      <Grid
        item
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <Typography variant="h2" color={theme.palette.primary.main}>
          {edit ? "Chỉnh sửa phí" : "Tạo mới phí"}
        </Typography>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{ marginTop: "3%" }}
      >
        <Grid
          item
          container
          xs={9}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={5}>
            <Typography color={theme.palette.secondary.main} variant="h4">
              Tên phí
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              required
              fullWidth
              label="Tên phí"
              type="text"
              value={name}
              onChange={handleChangeName}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={9}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={5}>
            <Typography color={theme.palette.secondary.main} variant="h4">
              Loại hinh doanh nghiệp
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Loại hinh</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeBusiness}
                label="typeBusiness"
                onChange={handleChange}
              >
                <MenuItem fullWidth value="Doanh nghiệp" sx={{ width: "100%" }}>
                  Doanh nghiệp
                </MenuItem>
                <br />
                <MenuItem fullWidth value="Nữ" sx={{ width: "100%" }}>
                  Tư nhân
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={9}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={5}>
            <Typography color={theme.palette.secondary.main} variant="h4">
              Giá phí
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              required
              label="Giá phí"
              type="number"
              value={price}
              inputProps={{
                min: 1,
              }}
              onChange={handleInputPrice}
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <CancelButton onClick={handleCloseModal} />
          </Grid>
          <Grid item>
            <SaveButton onClick={handleSave} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemModal;
