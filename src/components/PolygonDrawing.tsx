import React, { useRef, useState } from "react";
import "./PolygonDrawing.css";
import { Point, draw, arePointsConnected } from "../util";
import { Button, Stack } from "@mui/material";

const PolygonDrawing = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [connected, setConnected] = useState(false);

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
    setConnected(false);
    setPoints([]);
  };

  return (
    <Stack alignItems="center" justifyContent="center" rowGap="10px">
      <canvas
        className="canvas"
        ref={canvasRef}
        onClick={handlePoints}
        width={800}
        height={700}
      >
        <p>Canvas drawing</p>
      </canvas>

      <Button
        onClick={handleNewDrawing}
        variant="contained"
        disabled={!connected}
      >
        Start a new drawing
      </Button>
    </Stack>
  );
};

export default PolygonDrawing;
