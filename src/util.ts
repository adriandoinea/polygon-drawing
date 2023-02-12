export interface Point {
  x: number;
  y: number;
}

export function draw(points: Point[], canvas: any) {
  if (canvas.getContext) {
    const lastButOnePoint = points[points.length - 2];
    const lastPoint = points[points.length - 1];
    const ctx = canvas.getContext("2d");

    if (!ctx) return;
    ctx.beginPath();

    if (points.length > 1) {
      ctx.moveTo(lastButOnePoint.x, lastButOnePoint.y);
      ctx.lineTo(lastPoint.x, lastPoint.y);
    }

    ctx.stroke();
  }
}

export function arePointsConnected(points: Point[]) {
  if (points.length > 2) {
    const lastPoint = points[points.length - 1];
    for (let i = 0; i < points.length; i++) {
      if (
        lastPoint.x >= points[0].x - 1 &&
        lastPoint.x <= points[0].x + 1 &&
        lastPoint.y >= points[0].y - 1 &&
        lastPoint.y <= points[0].y + 1
      ) {
        return true;
      }
    }
  }

  return false;
}
