import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PolygonDrawing from "./components/PolygonDrawing";
import PromptModal from "./components/PromptModal";
import StatisticsPanel from "./components/StatisticsPanel";
import { RootState } from "./store";
import { dialogActions } from "./store/dialog-slice";
import { useCallback } from "react";
import { polygonActions } from "./store/polygon-slice";

function App() {
  const polygons = useSelector((state: RootState) => state.polygons);
  const dispatch = useDispatch();
  const [showTextarea, setShowTextarea] = useState(false);

  const handleStringChange = useCallback(
    (polygonText: string) => {
      dispatch(polygonActions.setPolygons(JSON.parse(polygonText)));
    },
    [dispatch]
  );

  useEffect(() => {
    if (localStorage.getItem("polygons")) {
      dispatch(dialogActions.openDialog());
    }
  }, [dispatch]);

  return (
    <Stack rowGap="10px" width="100%" height="100%" alignItems="center">
      <PromptModal />
      <StatisticsPanel />
      <PolygonDrawing />
      <Button onClick={() => setShowTextarea(!showTextarea)}>
        Toggle JSON view
      </Button>
      {showTextarea && (
        <textarea
          rows={20}
          onChange={(e) => handleStringChange(e.target.value)}
          value={JSON.stringify(polygons, null, 2)}
        ></textarea>
      )}
    </Stack>
  );
}

export default App;
