import { LanguageDataItemBase } from "./LanguageDataItemBase.js";
import type { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";
export declare class SingleLanguageDataItem extends LanguageDataItemBase {
    message: string;
    messageContext: string;
    properties: Buffer;
    constructor(reference: bigint, projectName: string, messageId: number, messageName: string, message: string, messageContext: string, properties: Buffer);
    static from(reference: bigint, projectName: string, consumer: BufferConsumer): SingleLanguageDataItem;
    toBuffer(): Buffer<ArrayBuffer>;
}
