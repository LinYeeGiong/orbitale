import { describe, expect, it } from 'vitest';

import { calculatePointer } from '../src/lib/orbit';

describe('calculatePointer', () => {
  it('returns a zero-degree pointer to a target on the right', () => {
    expect(calculatePointer({ x: 10, y: 10 }, { x: 30, y: 10 }, 100)).toEqual({
      angle: 0,
      length: 20,
    });
  });

  it('returns a ninety-degree pointer to a target below the origin', () => {
    expect(calculatePointer({ x: 0, y: 0 }, { x: 0, y: 25 }, 100)).toEqual({
      angle: 90,
      length: 25,
    });
  });

  it('clamps the pointer length without changing its angle', () => {
    expect(calculatePointer({ x: 0, y: 0 }, { x: 60, y: 80 }, 40)).toEqual({
      angle: 53.13010235415598,
      length: 40,
    });
  });
});
