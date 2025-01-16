import { BufferBuilder } from "@triforce-heroes/triforce-core/BufferBuilder";

import type { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";

export class GameObject {
  public constructor(
    public fileId: number,
    public pathId: number,
    public viewId: number,
    public enabled: boolean,
  ) {}

  public static from(consumer: BufferConsumer) {
    return new GameObject(
      consumer.readUnsignedInt32(),
      consumer.readUnsignedInt32(),
      consumer.readUnsignedInt32(),
      Boolean(consumer.readUnsignedInt32()),
    );
  }

  public toBuffer() {
    const builder = new BufferBuilder();

    builder.writeUnsignedInt32(this.fileId);
    builder.writeUnsignedInt32(this.pathId);
    builder.writeUnsignedInt32(this.viewId);
    builder.writeUnsignedInt32(Number(this.enabled));

    return builder.build();
  }
}
