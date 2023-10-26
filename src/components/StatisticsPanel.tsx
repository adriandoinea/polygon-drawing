import { Button, Collapse } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const StatisticsPanel = () => {
  const polygons = useSelector((state: RootState) => state.polygons);
  const [shownSettings, setShownSettings] = useState(false);

  const renderStatistics = () => {
    let countPoints = 0;
    for (let polygon of polygons) {
      countPoints += polygon.points.length;
    }
    return {
      polygons: polygons.length,
      totalPoints: countPoints,
      totalLines: countPoints - polygons.length,
    };
  };
  return (
    <Stack marginTop="5px">
      <Collapse in={shownSettings}>
        <Stack alignItems="center" rowGap="10px" marginBottom="5px">
          <div>Polygons: {renderStatistics().polygons}</div>
          <div>Total points: {renderStatistics().totalPoints}</div>
          <div>Total lines: {renderStatistics().totalLines}</div>
        </Stack>
      </Collapse>
      <Button
        onClick={() => setShownSettings((prev) => !prev)}
        title={shownSettings ? "Hide Statistics" : "Show Statistics"}
      >
        Toggle statistics
      </Button>
    </Stack>
  );
};

export default StatisticsPanel;
