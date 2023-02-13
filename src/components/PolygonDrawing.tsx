import React, { useEffect, useRef, useState } from "react";
import "./PolygonDrawing.css";
import { draw, arePointsConnected, drawWhenRender } from "../util";
import { Button, Stack } from "@mui/material";
import { Point } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { polygonActions } from "../store/polygon-slice";
import { RootState } from "../store";

const PolygonDrawing = () => {
  const dispatch = useDispatch();
  const polygons = useSelector((state: RootState) => state.polygons.polygons);
  const promptInfo = useSelector((state: RootState) => state.dialog);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (promptInfo.restoreLastSession) {
      if (localStorage.getItem("polygons")) {
        const savedPolygons = JSON.parse(localStorage.getItem("polygons")!);
        if (savedPolygons.length > 0) {
          for (let i = 0; i < savedPolygons.length; i++) {
            dispatch(
              polygonActions.updatePolygon({
                id: savedPolygons[i].id,
                newPolygon: savedPolygons[i],
              })
            );
            for (let i = 0; i < savedPolygons.length; i++) {
              drawWhenRender(savedPolygons[i].points, canvasRef.current);
            }
          }
        }
      }
    } else {
      canvasRef.current
        ?.getContext("2d")
        ?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      dispatch(polygonActions.clear());
      localStorage.clear();
    }
  }, [promptInfo.restoreLastSession]);

  useEffect(() => {
    if (polygons.length > 0) {
      localStorage.setItem("polygons", JSON.stringify(polygons));
    }
  }, [polygons]);

  const handlePoints = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillRect(x, y, 1, 1);

    const newPoints = [...points, { x, y }];
    setPoints(newPoints);

    draw(newPoints, canvas);
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
        className="canvas"
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
