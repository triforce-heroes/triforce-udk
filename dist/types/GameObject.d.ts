import type { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";
export declare class GameObject {
    fileId: number;
    pathId: number;
    viewId: number;
    enabled: boolean;
    constructor(fileId: number, pathId: number, viewId: number, enabled: boolean);
    static from(consumer: BufferConsumer): GameObject;
    toBuffer(): Buffer<ArrayBuffer>;
}
