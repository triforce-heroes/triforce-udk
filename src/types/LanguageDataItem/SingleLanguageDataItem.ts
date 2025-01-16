import { BufferBuilder } from "@triforce-heroes/triforce-core/BufferBuilder";

import { LanguageDataItemBase } from "./LanguageDataItemBase.js";

import type { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";

export class SingleLanguageDataItem extends LanguageDataItemBase {
  public constructor(
    reference: bigint,
    projectName: string,
    messageId: number,
    messageName: string,
    public message: string,
    public properties: Buffer,
  ) {
    super(reference, projectName, messageId, messageName);
  }

  public static from(
    reference: bigint,
    projectName: string,
    consumer: BufferConsumer,
  ) {
    const messageName = consumer.readLengthPrefixedString(4);
    consumer.skipPadding(4);

    const message = consumer.readLengthPrefixedString(4);
    consumer.skipPadding(4);

    const messageId = consumer.readUnsignedInt32();

    return new SingleLanguageDataItem(
      reference,
      projectName,
      messageId,
      messageName,
      message,
      consumer.read(16),
    );
  }

  public toBuffer() {
    const builder = new BufferBuilder();

    builder.writeInt64(this.reference);
    builder.writeLengthPrefixedString("SingleLanguageDataItem", 4);
    builder.pad(4);
    builder.writeLengthPrefixedString(this.projectName, 4);
    builder.pad(4);
    builder.writeLengthPrefixedString("Assembly-CSharp", 4);
    builder.pad(4);
    builder.writeLengthPrefixedString(this.messageName, 4);
    builder.pad(4);
    builder.writeLengthPrefixedString(this.message, 4);
    builder.pad(4);
    builder.writeUnsignedInt32(this.messageId);
    builder.push(this.properties);

    return builder.build();
  }
}
