export interface Point {
  x: number;
  y: number;
}

export function draw(points: Point[], canvas: any) {
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.stroke();
  }
}
