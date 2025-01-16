import { BufferBuilder } from "@triforce-heroes/triforce-core/BufferBuilder";

import type { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";

export class LanguageData {
  public constructor(
    public reference: bigint,
    public projectName: string,
    public languageId: number,
    public references: bigint[],
  ) {}

  public static from(consumer: BufferConsumer) {
    const reference = consumer.readInt64();

    // String "LanguageData"
    consumer.readLengthPrefixedString(4);
    consumer.skipPadding(4);

    const projectName = consumer.readLengthPrefixedString(4);
    consumer.skipPadding(4);

    // String "Assembly-CSharp"
    consumer.readLengthPrefixedString(4);
    consumer.skipPadding(4);

    const languageId = consumer.readUnsignedInt32();

    const referencesCount = consumer.readUnsignedInt32();
    const references: bigint[] = [];

    for (
      let referenceIndex = 0;
      referenceIndex < referencesCount;
      referenceIndex++
    ) {
      references.push(consumer.readInt64());
    }

    return new LanguageData(reference, projectName, languageId, references);
  }

  public toBuffer() {
    const builder = new BufferBuilder();

    builder.writeInt64(this.reference);
    builder.writeLengthPrefixedString("LanguageData", 4);
    builder.pad(4);
    builder.writeLengthPrefixedString(this.projectName, 4);
    builder.pad(4);
    builder.writeLengthPrefixedString("Assembly-CSharp", 4);
    builder.pad(4);
    builder.writeUnsignedInt32(this.languageId);
    builder.writeUnsignedInt32(this.references.length);

    for (const reference of this.references) {
      builder.writeInt64(reference);
    }

    return builder.build();
  }
}
