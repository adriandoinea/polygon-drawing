export interface Point {
  x: number;
  y: number;
}

export interface Polygon {
  id: number;
  points: Point[];
  numPoints: number;
}
