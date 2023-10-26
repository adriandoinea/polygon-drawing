import React, { useEffect, useRef, useState } from "react";
import styles from "./PolygonDrawing.module.css";
import { draw, arePointsConnected, drawWhenRender } from "../util";
import { Button, Stack } from "@mui/material";
import { Point } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { polygonActions } from "../store/polygon-slice";
import { RootState } from "../store";

const PolygonDrawing = () => {
  const dispatch = useDispatch();
  const closedPolygons = useSelector((state: RootState) => state.polygons);
  const promptInfo = useSelector((state: RootState) => state.dialog);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (promptInfo.restoreLastSession) {
      if (localStorage.getItem("polygons")) {
        const savedPolygons = JSON.parse(localStorage.getItem("polygons")!);
        dispatch(polygonActions.setPolygons(savedPolygons));

        for (let polygon of savedPolygons) {
          drawWhenRender(polygon.points, canvasRef.current);
        }
      }
    } else {
      dispatch(polygonActions.clear());
      localStorage.setItem("polygons", "");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [dispatch, promptInfo.restoreLastSession]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (closedPolygons.length > 0) {
      localStorage.setItem("polygons", JSON.stringify(closedPolygons));
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      for (let i = 0; i < closedPolygons.length; i++) {
        drawWhenRender(closedPolygons[i].points, canvasRef.current);
      }
    }
  }, [closedPolygons, dispatch]);

  const handlePoints = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.fillRect(x, y, 1, 1);

    const newPoints = [...points, { x, y }];
    setPoints(newPoints);

    draw(newPoints, canvasRef.current);
    if (arePointsConnected(newPoints)) setConnected(true);
  };

  const handleNewDrawing = () => {
    dispatch(polygonActions.addNewPolygon(points));
    setConnected(false);
    setPoints([]);
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

      <Button
        onClick={handleNewDrawing}
        variant="contained"
        disabled={!connected}
      >
        Close the current polygon
      </Button>
    </Stack>
  );
};

export default PolygonDrawing;
