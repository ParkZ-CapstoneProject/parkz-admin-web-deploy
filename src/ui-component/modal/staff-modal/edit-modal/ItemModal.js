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
import React, { useEffect } from "react";
import { useState } from "react";
import SaveButton from "ui-component/buttons/save-button/SaveButton";
import CancelButton from "ui-component/buttons/cancel-button/CancelButton";
import UploadAvatar from "ui-component/upload-file/upload-staff/UploadAvatar";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "store/modalReducer";
// import validator from "validator";
import Swal from "sweetalert2";
import Loading from "ui-component/back-drop/Loading";

const ItemModal = ({ modalType }) => {
  const theme = useTheme();

  const staffId = useSelector((state) => state.modal.staffId);

  const dispatch = useDispatch();

  const defaultData = {
    name: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    avatar: "",
  };

  const [data, setData] = useState(defaultData);
  // const [errorEmail, setErrorEmail] = useState(false);
  const [avatar, setAvatar] = useState("");
  const edit = true;
  const [loading, setLoading] = useState(false);

  const apiUrl = "https://parkzserver-001-site1.btempurl.com/api";
  const token = localStorage.getItem("tokenAdmin");

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
      `${apiUrl}/staff-account-management/${staffId}`,
      requestOptions
    );

    const responseData = await response.json();
    if (responseData) {
      setData(responseData.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log("data.avatar", data.avatar);

  useEffect(() => {
    if (avatar) {
      setData((prevData) => ({
        ...prevData,
        avatar: avatar,
      }));
    }
  }, [avatar]);

  const handleInputPhone = (event) => {
    const { value } = event.target;
    const phoneNumber = value.replace(/\D/g, ""); // Remove non-digit characters

    if (phoneNumber.length > 0 && phoneNumber[0] === "0") {
      setData((prevData) => ({
        ...prevData,
        phone: phoneNumber.substring(0, 10),
      }));
    }
  };

  // const handleInputEmail = (event) => {
  //   const { value } = event.target;

  //   const startsWithSpace = /^\s/.test(value);
  //   // Remove any spaces from the input value
  //   if (!startsWithSpace) {
  //     setData((prevData) => ({
  //       ...prevData,
  //       email: value,
  //     }));
  //     setErrorEmail(!validator.isEmail(value));
  //   } else {
  //     setErrorEmail(true);
  //   }
  // };

  const handleDateOfBirthChange = (event) => {
    const { value } = event.target;
    setData((prevData) => ({
      ...prevData,
      dateOfBirth: value,
    }));
  };

  const handleChangeName = (event) => {
    const { value } = event.target;
    setData((prevData) => ({
      ...prevData,
      name: value,
    }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal(modalType));
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };

  const handleSubmit = async () => {
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

        try {
          const response = await fetch(`${apiUrl}/staff-account-management`, {
            ...requestOptions,
            method: "PUT",
            body: JSON.stringify(data),
          });
          const dataRes = await response.json();
          if (dataRes.statusCode === 204) {
            Swal.fire({
              icon: "success",
              text: "Cập nhật thông tin nhân viên thành công!",
            });
          } else {
            Swal.fire({
              icon: "error",
              text: dataRes.message,
            });
          }
        } catch (error) {
          // Handle network errors here
          console.error("Error:", error);
        }
      }
    });
  };

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <>
      <Grid
        item
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <Typography variant="h2" color={theme.palette.primary.main}>
          Chỉnh sửa nhân viên
        </Typography>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{ marginTop: "5%" }}
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
              Tên NV
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              label="Tên NV"
              type="text"
              value={data.name}
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
              Ngày-tháng-năm sinh
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              type="date"
              value={data.dateOfBirth.substring(0, 10)}
              onChange={handleDateOfBirthChange}
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
              Email
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={data.email}
              // onChange={handleInputEmail}
              // error={errorEmail}
              // helperText={errorEmail ? "Vui lòng nhập đúng email" : ""}
              InputProps={{
                readOnly: true,
              }}
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
              SĐT
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              type="number"
              label="SĐT"
              value={data.phone}
              onChange={handleInputPhone}
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
              Giới tính
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.gender}
                label="gender"
                onChange={handleChange}
                defaultValue={data.gender}
              >
                <MenuItem fullWidth value="Nam" sx={{ width: "100%" }}>
                  Nam
                </MenuItem>
                <br />
                <MenuItem fullWidth value="Nữ" sx={{ width: "100%" }}>
                  Nữ
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
              Ảnh đại diện
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <UploadAvatar
              avatar={data.avatar}
              setAvatar={setAvatar}
              edit={edit}
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
            <SaveButton onClick={handleSubmit} />
          </Grid>
        </Grid>
      </Grid>

      {/* <DialogEdit open={openDialog} modalType={modalType} /> */}
    </>
  );
};

export default ItemModal;
