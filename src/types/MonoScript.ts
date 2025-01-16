import { BufferBuilder } from "@triforce-heroes/triforce-core/BufferBuilder";

import type { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";

export class MonoScript {
  public constructor(
    public fileId: number,
    public pathId: number,
    public viewId: number,
    public name: string,
  ) {}

  public static from(consumer: BufferConsumer) {
    const instance = new MonoScript(
      consumer.readUnsignedInt32(),
      consumer.readUnsignedInt32(),
      consumer.readUnsignedInt32(),
      consumer.readLengthPrefixedString(4),
    );

    consumer.skipPadding(4);

    return instance;
  }

  public toBuffer() {
    const builder = new BufferBuilder();

    builder.writeUnsignedInt32(this.fileId);
    builder.writeUnsignedInt32(this.pathId);
    builder.writeUnsignedInt32(this.viewId);
    builder.writeLengthPrefixedString(this.name, 4);
    builder.pad(4);

    return builder.build();
  }
}
