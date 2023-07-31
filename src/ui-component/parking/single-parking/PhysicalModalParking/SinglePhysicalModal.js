/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import carIcon from "../../../../assets/images/Car.svg";
import {
  initializeFloors,
  setCarSlots,
  setNumCarColumns,
  setNumCarRows,
} from "store/parkingModalSlice";
import FormInput from "./FormInput";
import { Image, Layer, Rect, Stage, Text } from "react-konva";
import Swal from "sweetalert2";

const SinglePhysicalModal = ({ floorIndex, edit, listCarSlots }) => {
  const dispatch = useDispatch();
  const slotWidth = 150;
  const slotHeight = 120;
  const spacing = 15;
  const stagePadding = 40;

  const [carSlotsCurrent, setCarSlotsCurrent] = useState([]);

  const numCarRows = Math.max(...listCarSlots.map((slot) => slot.rowIndex)) + 1;
  const numCarCols =
    Math.max(...listCarSlots.map((slot) => slot.columnIndex)) + 1;

  // const numCarSlots = listCarSlots.length;
  // console.log("numCarCols", numCarSlots);

  const [stageWidth, setStageWidth] = useState(
    numCarCols * (slotWidth + spacing) + stagePadding * 2
  );
  const [stageHeight, setStageHeight] = useState(
    numCarRows * (slotHeight + spacing) + stagePadding * 2
  );

  const [carImage, setCarImage] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      const carImageObject = await loadImage(carIcon);
      setCarImage(carImageObject);
    };

    loadImages();
  }, []);

  const loadImage = (imagePath) => {
    return new Promise((resolve, reject) => {
      const image = new window.Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = imagePath;
    });
  };

  useEffect(() => {
    const calculatedCarSlots = listCarSlots.map((slot) => ({
      id: slot.parkingSlotId,
      trafficId: 1,
      row: slot.rowIndex,
      column: slot.columnIndex,
      x: slot.columnIndex * (slotWidth + spacing) + stagePadding,
      y: slot.rowIndex * (slotHeight + spacing) + stagePadding,
      name: slot.name.substring(0, 4),
      isDragging: false,
    }));
    setCarSlotsCurrent(calculatedCarSlots);

    const newStageWidth = numCarCols * (slotWidth + spacing) + stagePadding * 2;
    const newStageHeight =
      numCarRows * (slotHeight + spacing) + stagePadding * 2;
    setStageWidth(newStageWidth);
    setStageHeight(newStageHeight);
  }, [slotWidth, slotHeight, spacing, stagePadding, listCarSlots]);

  const handleDragStart = (slotId) => {
    const updatedCarSlots = carSlotsCurrent.map((slot) => {
      if (slot.id === slotId) {
        return { ...slot, isDragging: true };
      }
      return slot;
    });
    setCarSlotsCurrent(updatedCarSlots);
  };

  // useEffect(() => {
  //   if (edit) {
  //     dispatch(setCarSlots({ floorIndex, carSlots: carSlotsCurrent }));

  //     dispatch(
  //       setNumCarRows({ floorIndex: floorIndex, numCarRows: numCarRows })
  //     );
  //     dispatch(
  //       setNumCarColumns({ floorIndex: floorIndex, numCarCols: numCarCols })
  //     );
  //   }
  // }, [floorIndex, listCarSlots, edit]);

  const handleDragEnd = (e, slotId) => {
    const updatedSlots = carSlotsCurrent.map((slot) => {
      if (slot.id === slotId) {
        const { x, y } = e.target.position();
        const row = Math.floor((y - stagePadding) / (slotHeight + spacing));
        const col = Math.floor((x - stagePadding) / (slotWidth + spacing));

        if (row < 0 || row >= numCarRows || col < 0 || col >= numCarCols) {
          Swal.fire({
            icon: "error",
            title: "Sai vị trí",
            text: "Chỉ kéo vị trí trong khoảng hàng, cột chính",
          });
          e.target.setAttrs({
            x: slot.x + 40,
            y: slot.y + 55,
          });
          return {
            ...slot,
            isDragging: false,
          };
        }

        const targetSlot = carSlotsCurrent.find(
          (s) => s.column === col && s.row === row
        );
        if (targetSlot && targetSlot.id !== slotId) {
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Vị trí này đã có xe đỗ",
          });
          e.target.setAttrs({
            x: slot.x + 40,
            y: slot.y + 55,
          });
          return {
            ...slot,
            isDragging: false,
          };
        }

        const newX = col * (slotWidth + spacing) + stagePadding;
        const newY = row * (slotHeight + spacing) + stagePadding;

        return {
          ...slot,
          row,
          column: col,
          x: newX,
          y: newY,
          isDragging: false,
        };
      }
      return slot;
    });

    setCarSlotsCurrent(updatedSlots);
  };

  return (
    <div className="scrollable-container">
      <div className="stage-container">
        {edit && <FormInput floorIndex={floorIndex} />}

        <div className="scrollable-stage">
          <Stage width={stageWidth} height={stageHeight} draggable={edit}>
            <Layer>
              {carSlotsCurrent?.map((slot) => (
                <Fragment key={slot.id}>
                  <Rect
                    x={slot.x}
                    y={slot.y}
                    width={slotWidth}
                    height={slotHeight}
                    fill={slot.isDragging ? "red" : "lightblue"}
                    stroke="black"
                    strokeWidth={1}
                    draggable={!slot.isDragging && edit}
                    onDragStart={() => handleDragStart(slot.id)}
                    onDragEnd={(e) => handleDragEnd(e, slot.id)}
                    dash={[5, 5]}
                    cornerRadius={10}
                  />
                  <Text
                    x={slot.x + 8}
                    y={slot.y - 25}
                    fill="#5e35b1"
                    width={slotWidth - 10}
                    height={slotHeight - 10}
                    text={slot.name}
                    fontSize={14}
                    align="center"
                    verticalAlign="middle"
                    fontStyle="bold"
                  />
                  {carImage && (
                    <Image
                      image={carImage}
                      align="center"
                      x={slot.x + 40} // Adjust the position as needed
                      y={slot.y + 55} // Adjust the position as needed
                      width={slotWidth - 75} // Adjust the size as needed
                      height={slotHeight - 75} // Adjust the size as needed
                      draggable={edit}
                      dash={[5, 5]}
                      onDragStart={() => handleDragStart(slot.id)}
                      onDragEnd={(e) => handleDragEnd(e, slot.id)}
                    />
                  )}
                </Fragment>
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default SinglePhysicalModal;
