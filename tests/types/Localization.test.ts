import { BufferBuilder } from "@triforce-heroes/triforce-core/BufferBuilder";
import { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";
import { describe, expect, it } from "vitest";

import { Localization } from "../../src/types/Localization.js";

describe("Localization class", () => {
  const sampleBuilder = new BufferBuilder();
  const sampleUnknown = Buffer.from("0000111122223333444455556666");

  sampleBuilder.writeUnsignedInt32(2);
  sampleBuilder.writeInt64(1n);
  sampleBuilder.writeInt64(-2n);
  sampleBuilder.push(sampleUnknown);

  const sampleBuffer = sampleBuilder.build();

  const sampleLocalization = new Localization([1n, -2n], sampleUnknown);

  it("from()", () => {
    const consumer = new BufferConsumer(sampleBuffer);

    expect(Localization.from(consumer)).toStrictEqual(sampleLocalization);
  });

  it("toBuffer()", () => {
    expect(sampleLocalization.toBuffer()).toStrictEqual(sampleBuffer);
  });
});
