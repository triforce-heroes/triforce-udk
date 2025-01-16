import { BufferBuilder } from "@triforce-heroes/triforce-core/BufferBuilder";

import { LanguageDataItemBase } from "./LanguageDataItemBase.js";

import type { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";

export class MultipleLanguageDataItem extends LanguageDataItemBase {
  public constructor(
    reference: bigint,
    projectName: string,
    messageId: number,
    messageName: string,
    public references: bigint[],
  ) {
    super(reference, projectName, messageId, messageName);
  }

  public static from(
    reference: bigint,
    projectName: string,
    consumer: BufferConsumer,
  ) {
    const messageId = consumer.readUnsignedInt32();

    const messageName = consumer.readLengthPrefixedString(4);
    consumer.skipPadding(4);

    const referencesCount = consumer.readUnsignedInt32();
    const references: bigint[] = [];

    for (
      let referenceIndex = 0;
      referenceIndex < referencesCount;
      referenceIndex++
    ) {
      references.push(consumer.readInt64());
    }

    return new MultipleLanguageDataItem(
      reference,
      projectName,
      messageId,
      messageName,
      references,
    );
  }

  public toBuffer() {
    const builder = new BufferBuilder();

    builder.writeInt64(this.reference);
    builder.writeLengthPrefixedString("MultipleLanguageDataItem", 4);
    builder.pad(4);
    builder.writeLengthPrefixedString(this.projectName, 4);
    builder.pad(4);
    builder.writeLengthPrefixedString("Assembly-CSharp", 4);
    builder.pad(4);
    builder.writeUnsignedInt32(this.messageId);
    builder.writeLengthPrefixedString(this.messageName, 4);
    builder.pad(4);
    builder.writeUnsignedInt32(this.references.length);

    for (const reference of this.references) {
      builder.writeInt64(reference);
    }

    return builder.build();
  }
}
