import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import "./QRScanCode.scss";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router";

const QRScanCode = () => {
  // const { openScanner, closeScanner } = props;
  const theme = useTheme();
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const [openScanner, setOpenScanner] = useState(true);

  const navigate = useNavigate();

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
      navigate(`{result.text}`);
    }
  };

  // const openScannerOnClick = () => {
  //   setOpenScanner(true);
  // };

  const closeScanner = () => {
    setOpenScanner(false);
    navigate("/booking");
  };

  console.log("scanResultWebCam", scanResultWebCam);

  return (
    <div>
      {/* <button onClick={openScannerOnClick}>Open Scanner</button> */}
      {openScanner && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgb(0 0 0 / 74%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              width: "30%",
              height: "50%",
              backgroundColor: "transparent",
              borderRadius: "8px",
              padding: "20px",
              position: "relative",
            }}
          >
            <QrReader
              delay={300}
              style={{ width: "100%" }}
              onError={handleErrorWebCam}
              onScan={handleScanWebCam}
              onResult={handleScanWebCam}
            />
            <IconButton
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "4px",
                color: theme.palette.grey[500],
                backgroundColor: theme.palette.grey[100],
              }}
              onClick={closeScanner}
            >
              <CloseIcon />
            </IconButton>
            {/* <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "4px",
              }}
              onClick={closeScanner}
            >
              Close
            </button> */}
          </div>
        </div>
      )}
      {/* {scanResultWebCam && <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>} */}
    </div>
  );
};

export default QRScanCode;
