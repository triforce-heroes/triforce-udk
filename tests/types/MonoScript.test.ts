import { BufferBuilder } from "@triforce-heroes/triforce-core/BufferBuilder";
import { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";
import { describe, expect, it } from "vitest";

import { MonoScript } from "../../src/types/MonoScript.js";

describe("MonoScript class", () => {
  const sampleBuilder = new BufferBuilder();

  sampleBuilder.writeUnsignedInt32(1);
  sampleBuilder.writeUnsignedInt32(3053);
  sampleBuilder.writeUnsignedInt32(0);
  sampleBuilder.writeLengthPrefixedString("Localization", 4);

  const sampleBuffer = sampleBuilder.build();

  const sampleMonoScript = new MonoScript(1, 3053, 0, "Localization");

  it("from()", () => {
    const consumer = new BufferConsumer(sampleBuffer);

    expect(MonoScript.from(consumer)).toStrictEqual(sampleMonoScript);
  });

  it("toBuffer()", () => {
    expect(sampleMonoScript.toBuffer()).toStrictEqual(sampleBuffer);
  });
});
