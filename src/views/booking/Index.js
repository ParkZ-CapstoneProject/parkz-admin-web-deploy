import React from "react";
import DataTable from "./Booking";
import { useState } from "react";

const Booking = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      avatar:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      name: "Nguyễn Thị Minh Khai",
      position: "A4",
      startTime: "7 : 00 AM",
      endTime: "10 : 00 AM",
      totalPrice: "20,000 vnđ",
      phone: "012341234132",
      licensePlate: "60A - 12345",
      parkingName: "Hoàng Văn Thụ",
      checkInTime: "7 AM",
      checkOutTime: null,
      paymentMethod: null,
      guestName: null,
      guestPhone: null,
      status: "Khởi tạo",
    },
    {
      id: 2,
      avatar:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      name: "Đỗ Anh Linh",
      position: "A4",
      startTime: "7 : 00 AM",
      totalPrice: "20,000 vnđ",
      phone: "012341234132",
      licensePlate: "60A - 12345",
      parkingName: "Hoàng Văn Thụ",
      checkInTime: "7 AM",
      checkOutTime: null,
      paymentMethod: null,
      guestName: "Nguyễn Thị Minh Khai",
      guestPhone: null,
      status: "Thành công",
    },
    {
      id: 3,
      avatar:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      name: "Nguyễn Thị Minh Khai",
      position: "A4",
      startTime: "7 : 00 AM",
      totalPrice: "20,000 vnđ",
      phone: "012341234132",
      licensePlate: "60A - 12345",
      parkingName: "Hoàng Văn Thụ",
      checkInTime: "7 AM",
      checkOutTime: null,
      paymentMethod: null,
      guestName: null,
      guestPhone: null,
      status: "Đã duyệt",
    },
    {
      id: 4,
      avatar:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      name: "Nguyễn Thị Minh Khai",
      position: "A4",
      startTime: "7 : 00 AM",
      totalPrice: "20,000 vnđ",
      phone: "012341234132",
      licensePlate: "60A - 12345",
      parkingName: "Hoàng Văn Thụ",
      checkInTime: "7 AM",
      checkOutTime: null,
      paymentMethod: null,
      guestName: null,
      guestPhone: null,
      status: "Vào bãi",
    },
    {
      id: 5,
      avatar:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      name: "Nguyễn Thị Minh Khai",
      position: "A4",
      startTime: "7 : 00 AM",
      totalPrice: "20,000 vnđ",
      phone: "012341234132",
      licensePlate: "60A - 12345",
      parkingName: "Hoàng Văn Thụ",
      checkInTime: "7 AM",
      checkOutTime: null,
      paymentMethod: null,
      guestName: null,
      guestPhone: null,
      status: "Chờ thanh toán",
    },
    {
      id: 6,
      avatar:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      name: "Nguyễn Thị Minh Khai",
      position: "A4",
      startTime: "7 : 00 AM",
      totalPrice: "20,000 vnđ",
      phone: "012341234132",
      licensePlate: "60A - 12345",
      parkingName: "Hoàng Văn Thụ",
      checkInTime: "7 AM",
      checkOutTime: null,
      paymentMethod: null,
      guestName: null,
      guestPhone: null,
      status: "Ra bãi",
    },
    {
      id: 7,
      avatar:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      name: "Nguyễn Thị Minh Khai",
      position: "A4",
      startTime: "7 : 00 AM",
      totalPrice: "20,000 vnđ",
      phone: "012341234132",
      licensePlate: "60A - 12345",
      parkingName: "Hoàng Văn Thụ",
      checkInTime: "7 AM",
      checkOutTime: null,
      paymentMethod: null,
      guestName: null,
      guestPhone: null,
      status: "Hủy đơn",
    },
  ]);
  return (
    <>
      <DataTable rows={rows} />
    </>
  );
};

export default Booking;
