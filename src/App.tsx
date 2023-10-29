import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import PolygonDrawing from "./components/PolygonDrawing";
import PromptModal from "./components/PromptModal";
import StatisticsPanel from "./components/StatisticsPanel";
import { useCallback } from "react";
import { Polygon } from "./types/types";
import { arePointsConnected } from "./util";

function App() {
  const [showTextarea, setShowTextarea] = useState(false);
  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [isLastSessionRestored, setIsLastSessionRestored] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePolygonsChange = useCallback((updatedPolygons: Polygon[]) => {
    setPolygons(updatedPolygons);
  }, []);

  const handleStringChange = (polygonText: string) => {
    const newPolygons: Polygon[] = JSON.parse(polygonText);
    for (let polygon of newPolygons) {
      polygon.numPoints = polygon.points.length;
      polygon.closed = arePointsConnected(polygon.points);
    }
    handlePolygonsChange(newPolygons);
  };

  useEffect(() => {
    if (localStorage.getItem("polygons")) {
      setIsDialogOpen(true);
    }
  }, []);

  return (
    <Stack rowGap="10px" width="100%" height="100%" alignItems="center">
      <PromptModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSetIsLastSessionRestored={(data: boolean) =>
          setIsLastSessionRestored(data)
        }
      />
      <StatisticsPanel polygons={polygons} />
      <PolygonDrawing
        polygons={polygons}
        onChangePolygons={handlePolygonsChange}
        isLastSessionRestored={isLastSessionRestored}
      />
      <Button onClick={() => setShowTextarea(!showTextarea)}>
        Toggle JSON view
      </Button>
      {showTextarea && (
        <textarea
          rows={20}
          cols={50}
          onChange={(e) => handleStringChange(e.target.value)}
          value={JSON.stringify(polygons, null, 2)}
        ></textarea>
      )}
    </Stack>
  );
}

export default App;
