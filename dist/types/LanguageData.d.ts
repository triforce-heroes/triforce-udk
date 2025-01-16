import { SingleLanguageDataItem } from "./LanguageDataItem/SingleLanguageDataItem.js";
import type { LanguageDataItemBase } from "./LanguageDataItem/LanguageDataItemBase.js";
import type { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";
export declare class LanguageData {
    reference: bigint;
    projectName: string;
    languageId: number;
    references: bigint[];
    items: Map<number, SingleLanguageDataItem>;
    constructor(reference: bigint, projectName: string, languageId: number, references: bigint[]);
    static from(consumer: BufferConsumer): LanguageData;
    toBuffer(): Buffer<ArrayBuffer>;
    fill(items: Map<bigint, LanguageDataItemBase>): void;
    setMessage(messageId: number, message: string): void;
}
