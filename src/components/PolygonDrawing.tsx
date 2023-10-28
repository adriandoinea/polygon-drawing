import React, { useCallback, useEffect, useRef } from "react";
import styles from "./PolygonDrawing.module.css";
import { draw, arePointsConnected } from "../util";
import { Stack } from "@mui/material";
import { Polygon } from "../types/types";

interface PolygonDrawingProps {
  isLastSessionRestored: boolean;
  polygons: Polygon[];
  onChangePolygons: (updatedPolygons: Polygon[]) => void;
}

const PolygonDrawing = ({
  isLastSessionRestored,
  polygons,
  onChangePolygons,
}: PolygonDrawingProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const undoFn = useCallback(
    (event: KeyboardEvent) => {
      if (!canvasRef.current) return null;
      if ((event.ctrlKey || event.metaKey) && event.key === "z") {
        const temp = [...polygons];
        const lastPolygon = temp[temp.length - 1];
        if (lastPolygon) {
          if (!lastPolygon.closed) {
            lastPolygon.points.pop();
            lastPolygon.numPoints = lastPolygon.points.length;
            if (lastPolygon.points.length === 0) {
              temp.pop();
            }
          }
        }

        onChangePolygons(temp);
      }
    },
    [onChangePolygons, polygons]
  );

  useEffect(() => {
    document.addEventListener("keydown", undoFn, false);
    return () => {
      document.removeEventListener("keydown", undoFn, false);
    };
  }, [undoFn]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (isLastSessionRestored) {
      if (localStorage.getItem("polygons")) {
        const savedPolygons = JSON.parse(localStorage.getItem("polygons")!);
        onChangePolygons(savedPolygons);
      }
    } else {
      onChangePolygons([]);
      localStorage.setItem("polygons", "");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [onChangePolygons, isLastSessionRestored]);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      for (let polygon of polygons) {
        draw(polygon.points, canvasRef.current);
      }
    }
    const closedPolygons = polygons.filter(
      (polygon) => polygon.closed !== false
    );
    if (closedPolygons.length > 0) {
      localStorage.setItem("polygons", JSON.stringify(closedPolygons));
    }
  }, [polygons]);

  const handlePoints = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.fillRect(x, y, 1, 1);

    const openPolygons = polygons.filter((polygon) => !polygon.closed);
    const temp = [...polygons];
    const firstOpenPolygon = openPolygons[0] || { points: [] };
    const newPolygon = {
      id: temp.length + 1,
      points: [{ x, y }],
      numPoints: 1,
      closed: false,
    };
    if (openPolygons.length === 0 || temp.length === 0) {
      temp.push(newPolygon);
    } else {
      firstOpenPolygon.points = [...firstOpenPolygon.points, { x, y }];
      firstOpenPolygon.numPoints = firstOpenPolygon.points.length;
      if (arePointsConnected(firstOpenPolygon.points)) {
        firstOpenPolygon.closed = true;
      }
    }
    onChangePolygons(temp);
  };

  return (
    <Stack alignItems="center" justifyContent="center" rowGap="10px">
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        onClick={handlePoints}
        width={700}
        height={600}
      >
        <p>Canvas drawing</p>
      </canvas>
    </Stack>
  );
};

export default PolygonDrawing;
