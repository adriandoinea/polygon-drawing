import React, { useRef, useState } from "react";
import "./PolygonDrawing.css";
import { Point, draw } from "../util";
import { Button, Stack } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

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
    ctx.fillRect(x, y, 2, 2);
    for (let i = 0; i < points.length; i++) {
      if (
        x >= points[0].x - 2 &&
        x <= points[0].x + 2 &&
        y >= points[0].y - 2 &&
        y <= points[0].y + 2
      ) {
        setConnected(true);
      }
    }
    const newPoints = [...points, { x, y }];
    setPoints(newPoints);

    draw(newPoints, canvas);
  };

  const handleNewDrawing = () => {
    setConnected(false);
    setPoints([]);
  };

  return (
    <Stack
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      rowGap="10px"
    >
      <canvas
        className="canvas"
        ref={canvasRef}
        onClick={handlePoints}
        width={500}
        height={500}
      >
        <p>Canvas drawing</p>
      </canvas>

      <div>
        <Button>
          <ZoomOutIcon />
        </Button>
        <Button>
          <ZoomInIcon />
        </Button>
      </div>

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
