import type { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";
export declare class Localization {
    references: bigint[];
    unknown: Buffer;
    constructor(references: bigint[], unknown: Buffer);
    static from(consumer: BufferConsumer): Localization;
    toBuffer(): Buffer<ArrayBuffer>;
}
