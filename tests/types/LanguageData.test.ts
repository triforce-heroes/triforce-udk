import { BufferBuilder } from "@triforce-heroes/triforce-core/BufferBuilder";
import { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";
import { describe, expect, it } from "vitest";

import { LanguageData } from "../../src/types/LanguageData.js";

describe("LanguageData class", () => {
  const sampleBuilder = new BufferBuilder();

  sampleBuilder.writeInt64(5n);
  sampleBuilder.writeLengthPrefixedString("LanguageData", 4);
  sampleBuilder.pad(4);
  sampleBuilder.writeLengthPrefixedString("dk3ds", 4);
  sampleBuilder.pad(4);
  sampleBuilder.writeLengthPrefixedString("Assembly-CSharp", 4);
  sampleBuilder.pad(4);
  sampleBuilder.writeUnsignedInt32(15);
  sampleBuilder.writeUnsignedInt32(3);
  sampleBuilder.writeInt64(1n);
  sampleBuilder.writeInt64(2n);
  sampleBuilder.writeInt64(3n);

  const sampleBuffer = sampleBuilder.build();

  const sampleLanguageData = new LanguageData(5n, "dk3ds", 15, [1n, 2n, 3n]);

  it("from()", () => {
    const consumer = new BufferConsumer(sampleBuffer);

    expect(LanguageData.from(consumer)).toStrictEqual(sampleLanguageData);
  });

  it("toBuffer()", () => {
    expect(sampleLanguageData.toBuffer()).toStrictEqual(sampleBuffer);
  });
});
