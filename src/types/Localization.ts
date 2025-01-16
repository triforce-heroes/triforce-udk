import { BufferBuilder } from "@triforce-heroes/triforce-core/BufferBuilder";

import type { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";

export class Localization {
  public constructor(public references: bigint[], public unknown: Buffer) {}

  public static from(consumer: BufferConsumer) {
    const referencesCount = consumer.readUnsignedInt32();
    const references: bigint[] = [];

    for (
      let referenceIndex = 0;
      referenceIndex < referencesCount;
      referenceIndex++
    ) {
      references.push(consumer.readInt64());
    }

    return new Localization(references, consumer.read(28));
  }

  public toBuffer() {
    const builder = new BufferBuilder();

    builder.writeUnsignedInt32(this.references.length);

    for (const reference of this.references) {
      builder.writeInt64(reference);
    }

    builder.push(this.unknown);

    return builder.build();
  }
}
