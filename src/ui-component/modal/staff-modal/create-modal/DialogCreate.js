// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { closeModal } from "store/modalReducer";
// import Swal from "sweetalert2";

// const DialogCreate = (props) => {
//   const {
//     open,
//     modalType,
//     dateOfBirth,
//     setDateOfBirth,
//     name,
//     setName,
//     email,
//     setEmail,
//     errorEmail,
//     phone,
//     setPhone,
//     gender,
//     avatar,
//     setAvatar,
//     parkingId,
//     setParkingId,
//   } = props;
//   const dispatch = useDispatch();

//   const apiUrl = 'https://parkzserver-001-site1.btempurl.com/api';
//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user"); // Set the authentication status here
//   const userData = JSON.parse(user);

//   const handleConfirm = async (e) => {
//     e.preventDefault();
//     if (errorEmail) {
//       return;
//     }

//     Swal.fire({
//       title: "Xác nhận?",
//       text: "Bạn có chắc chắn muốn lưu!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       cancelButtonText: "Hủy",
//       confirmButtonText: "Xác nhận!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         Swal.fire({
//           icon: "info",
//           title: "Đang xử lý thông tin...",
//           text: "Vui lòng chờ trong giây lát!",
//           allowOutsideClick: false,
//           showConfirmButton: false,
//           didOpen: () => {
//             Swal.showLoading();
//           },
//         });
//         const request = {
//           name: name,
//           email: email,
//           phone: phone,
//           dateOfBirth: dateOfBirth,
//           gender: gender,
//           avatar: avatar,
//           managerId: userData._id,
//           parkingId: parkingId,
//         };

//         const requestOptions = {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `bearer ${token}`,
//           },
//           body: JSON.stringify(request),
//         };

//         const response = await fetch(
//           `${apiUrl}/keeper-account-management/register`,
//           requestOptions
//         );

//         const data = await response.json();

//         if (data.statusCode === 204) {
//           Swal.fire({
//             icon: "success",
//             text: "Tạo mới ảo vệ thành công",
//           }).then((result) => {
//             if (result.isConfirmed) {
//               setDateOfBirth("");
//               setName("");
//               setPhone("");
//               setEmail();
//               setAvatar("");
//               setParkingId(0);

//               dispatch(closeModal(modalType));
//             }
//           });
//         } else {
//           Swal.fire({
//             icon: "error",
//             text: "Có lỗi khi tạo mới",
//           });
//         }
//       }
//     });
//   };

//   useEffect(() => {
//     if (open) {
//       handleConfirm();
//     }
//   }, [open]);

//   return null;
// };

// export default DialogCreate;
