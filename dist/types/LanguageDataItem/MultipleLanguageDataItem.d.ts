import { LanguageDataItemBase } from "./LanguageDataItemBase.js";
import type { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";
export declare class MultipleLanguageDataItem extends LanguageDataItemBase {
    references: bigint[];
    constructor(reference: bigint, projectName: string, messageId: number, messageName: string, references: bigint[]);
    static from(reference: bigint, projectName: string, consumer: BufferConsumer): MultipleLanguageDataItem;
    toBuffer(): Buffer<ArrayBuffer>;
}
