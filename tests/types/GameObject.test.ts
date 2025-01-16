import { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";
import { describe, expect, it } from "vitest";

import { GameObject } from "../../src/types/GameObject.js";

describe("GameObject class", () => {
  const sampleBuffer = Buffer.from([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  ]);

  const sampleGameObject = new GameObject(0, 0, 0, true);

  it("from()", () => {
    const consumer = new BufferConsumer(sampleBuffer);

    expect(GameObject.from(consumer)).toStrictEqual(sampleGameObject);
  });

  it("toBuffer()", () => {
    expect(sampleGameObject.toBuffer()).toStrictEqual(sampleBuffer);
  });
});
