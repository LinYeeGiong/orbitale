export interface Point {
  x: number;
  y: number;
}

export interface PointerGeometry {
  angle: number;
  length: number;
}

export function calculatePointer(origin: Point, target: Point, maxLength: number): PointerGeometry {
  const deltaX = target.x - origin.x;
  const deltaY = target.y - origin.y;

  return {
    angle: Math.atan2(deltaY, deltaX) * (180 / Math.PI),
    length: Math.min(Math.hypot(deltaX, deltaY), maxLength),
  };
}
