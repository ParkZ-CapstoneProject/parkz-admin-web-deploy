/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import carIcon from "../../../../assets/images/Car.svg";
import { Image, Layer, Rect, Stage, Text } from "react-konva";

const PhysicalModal = ({ floorIndex, listCarSlots }) => {
  const slotWidth = 150;
  const slotHeight = 120;
  const spacing = 15;
  const stagePadding = 40;

  const [carSlotsCurrent, setCarSlotsCurrent] = useState([]);

  const numCarRows = Math.max(...listCarSlots?.map((slot) => slot.rowIndex)) + 1;
  const numCarCols =
    Math.max(...listCarSlots?.map((slot) => slot.columnIndex)) + 1;

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
    const calculatedCarSlots = listCarSlots?.map((slot) => ({
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

  return (
    <div className="scrollable-container">
      <div className="stage-container">
        <div className="scrollable-stage">
          {carSlotsCurrent ? (
            <Stage width={stageWidth} height={stageHeight}>
              <Layer>
                {carSlotsCurrent?.map((slot) => (
                  <Fragment key={slot.id}>
                    <Rect
                      x={slot.x}
                      y={slot.y}
                      width={slotWidth}
                      height={slotHeight}
                      stroke="black"
                      fill="lightblue"
                      strokeWidth={1}
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
                        dash={[5, 5]}
                      />
                    )}
                  </Fragment>
                ))}
              </Layer>
            </Stage>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhysicalModal;
