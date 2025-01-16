import { BufferBuilder } from "@triforce-heroes/triforce-core/BufferBuilder";
import { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";
import { describe, expect, it } from "vitest";

import { LanguageDataItem } from "../../src/types/LanguageDataItem/LanguageDataItem.js";
import { MultipleLanguageDataItem } from "../../src/types/LanguageDataItem/MultipleLanguageDataItem.js";
import { SingleLanguageDataItem } from "../../src/types/LanguageDataItem/SingleLanguageDataItem.js";

describe("LanguageDataItem class", () => {
  const sampleSingleBuilder = new BufferBuilder();

  sampleSingleBuilder.writeInt64(1n);
  sampleSingleBuilder.writeLengthPrefixedString("SingleLanguageDataItem", 4);
  sampleSingleBuilder.pad(4);
  sampleSingleBuilder.writeLengthPrefixedString("dk3ds", 4);
  sampleSingleBuilder.pad(4);
  sampleSingleBuilder.writeLengthPrefixedString("Assembly-CSharp", 4);
  sampleSingleBuilder.pad(4);
  sampleSingleBuilder.writeLengthPrefixedString("NewText_60", 4);
  sampleSingleBuilder.pad(4);
  sampleSingleBuilder.writeLengthPrefixedString("Example Message", 4);
  sampleSingleBuilder.pad(4);
  sampleSingleBuilder.writeUnsignedInt32(123);
  sampleSingleBuilder.writeString("1234567812345678");

  const sampleSingleBuffer = sampleSingleBuilder.build();

  const sampleSingle = new SingleLanguageDataItem(
    1n,
    "dk3ds",
    123,
    "NewText_60",
    "Example Message",
    Buffer.from("1234567812345678"),
  );

  it("from(SingleLanguageDataItem)", () => {
    const consumer = new BufferConsumer(sampleSingleBuffer);

    expect(LanguageDataItem.from(consumer)).toStrictEqual(sampleSingle);
  });

  it("toBuffer(SingleLanguageDataItem)", () => {
    expect(sampleSingle.toBuffer()).toStrictEqual(sampleSingleBuffer);
  });

  const sampleMultipleBuilder = new BufferBuilder();

  sampleMultipleBuilder.writeInt64(2n);
  sampleMultipleBuilder.writeLengthPrefixedString(
    "MultipleLanguageDataItem",
    4,
  );
  sampleMultipleBuilder.pad(4);
  sampleMultipleBuilder.writeLengthPrefixedString("dk3ds", 4);
  sampleMultipleBuilder.pad(4);
  sampleMultipleBuilder.writeLengthPrefixedString("Assembly-CSharp", 4);
  sampleMultipleBuilder.pad(4);
  sampleMultipleBuilder.writeUnsignedInt32(123);
  sampleMultipleBuilder.writeLengthPrefixedString("blow", 4);
  sampleMultipleBuilder.pad(4);
  sampleMultipleBuilder.writeUnsignedInt32(2);
  sampleMultipleBuilder.writeInt64(3n);
  sampleMultipleBuilder.writeInt64(4n);

  const sampleMultipleBuffer = sampleMultipleBuilder.build();

  const sampleMultiple = new MultipleLanguageDataItem(
    2n,
    "dk3ds",
    123,
    "blow",
    [3n, 4n],
  );

  it("from(MultipleLanguageDataItem)", () => {
    const consumer = new BufferConsumer(sampleMultipleBuffer);

    expect(LanguageDataItem.from(consumer)).toStrictEqual(sampleMultiple);
  });

  it("toBuffer(MultipleLanguageDataItem)", () => {
    expect(sampleMultiple.toBuffer()).toStrictEqual(sampleMultipleBuffer);
  });
});
