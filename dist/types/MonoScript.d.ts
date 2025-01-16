import type { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";
export declare class MonoScript {
    fileId: number;
    pathId: number;
    viewId: number;
    name: string;
    constructor(fileId: number, pathId: number, viewId: number, name: string);
    static from(consumer: BufferConsumer): MonoScript;
    toBuffer(): Buffer<ArrayBuffer>;
}
