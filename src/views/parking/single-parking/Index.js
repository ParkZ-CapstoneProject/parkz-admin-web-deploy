import React from "react";
import MainCard from "ui-component/cards/MainCard";
import ParkingImage from "ui-component/parking/parking-images/ParkingImage";
import ParkingDetailInfo from "ui-component/parking/single-parking/DetailParkInfo/ParkingDetailInfo";
import Tabs from "ui-component/parking/single-parking/Tabs";
import FloorParking from "ui-component/parking/single-parking/PhysicalModalParking/FloorParking";
import ApproveParking from "ui-component/parking/single-parking/RequestParking/Index";

const tabs = [
  {
    label: "Thông tin bãi xe",
    component: <ParkingDetailInfo />,
  },
  {
    label: "Thông tin xa bàn",
    component: <FloorParking />,
  },
  {
    label: "Hình ảnh bãi xe",
    component: <ParkingImage />,
  },
  {
    label: "Thông tin yêu cầu duyệt",
    component: <ApproveParking />,
  },
];

const ParkingDetail = () => {
  // const { id } = useParams();
  // const [selectedOption, setSelectedOption] = useState(null);

  // Function to handle radio button change
  // const handleRadioChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
  // console.log("selectedOption", selectedOption);
  // console.log("parkingId", id);
  return (
    <>
      <MainCard title="Chi tiết bãi xe">
        <div className="container mx-auto mt-4">
          <Tabs tabs={tabs} />
        </div>
      </MainCard>

      {/* <Grid
        container
        sx={{
          backgroundColor: "#fff",
          marginTop: "15px",
          borderRadius: "12px",
          padding: "10px",
        }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <div className="radio-check">
            <form>
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="approve"
                  checked={selectedOption === "approve"}
                  onChange={handleRadioChange}
                />
                <span>Duyệt</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="reject"
                  checked={selectedOption === "reject"}
                  onChange={handleRadioChange}
                />
                <span>Từ chối</span>
              </label>
            </form>
          </div>
        </Grid>
        <Grid item>
          <SaveButton />
        </Grid>
      </Grid> */}
    </>
  );
};

export default ParkingDetail;
