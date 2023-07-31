import React from "react";
import { Box, Grid, Rating, Typography } from "@mui/material";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const GridItem = ({ leftText, rightText, color, active }) => {
  const theme = useTheme();
  const activeIcon = active ? (
    <Box sx={{ color: "success.main", ml: 1 }}>
      <CheckCircle />
    </Box>
  ) : (
    <Box sx={{ color: "gray", ml: 1 }}>
      <RadioButtonUnchecked />
    </Box>
  );
  const rightTextContent = active ? (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography color={theme.palette.common.black} variant="h4">
        {rightText}
      </Typography>
      {activeIcon}
    </Box>
  ) : (
    <Typography color={theme.palette.common.black} variant="h4">
      {rightText}
    </Typography>
  );
  return (
    <Grid item container direction="row" justifyContent="space-around">
      <Grid item xs={5}>
        <Typography color={color || theme.palette.primary.main} variant="h3">
          {leftText}
        </Typography>
      </Grid>
      <Grid item xs={7}>
        {rightTextContent}
      </Grid>
    </Grid>
  );
};
const RightItem = ({ data }) => {
  const theme = useTheme();

  return (
    <>
      <Grid container direction="column" spacing={5}>
        <GridItem
          leftText="Trạng thái"
          rightText={data?.isFull ? "Còn chỗ" : "Hết chỗ"}
          color={theme.palette.primary.main}
          active={data?.isFull}
        />

        <GridItem
          leftText="Trạng thái bãi xe"
          rightText={data?.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
          color={theme.palette.primary.main}
          active={data?.isActive}
        />
        <GridItem
          leftText="Đánh giá"
          rightText={<Rating value={data?.stars} readOnly />}
          color={theme.palette.primary.main}
        />
        <Grid item>
          <Typography color={theme.palette.primary.main} variant="h3">
            Mô tả
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={theme.palette.common.black} variant="h4">
            {data?.description}
          </Typography>
        </Grid>
        <GridItem leftText="Slot xe ô tô" rightText={data?.carSpot} />
        {/* <GridItem leftText="Gói cước xe ô tô" rightText="Gói A" /> */}
        {/* <GridItem leftText="Người quản lý" rightText="Hoàng Văn Minh" /> */}
      </Grid>
    </>
  );
};

export default RightItem;
