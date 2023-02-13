import { Stack } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import PolygonDrawing from "./components/PolygonDrawing";
import PromptModal from "./components/PromptModal";
import StatisticsPanel from "./components/StatisticsPanel";
import { dialogActions } from "./store/dialog-slice";

function App() {
  const dispatch = useDispatch();
  if (localStorage.getItem("polygons")) {
    dispatch(dialogActions.openDialog());
  }
  return (
    <Stack rowGap="10px" width="100%" height="100%" alignItems="center">
      <PromptModal />
      <StatisticsPanel />
      <PolygonDrawing />
    </Stack>
  );
}

export default App;
