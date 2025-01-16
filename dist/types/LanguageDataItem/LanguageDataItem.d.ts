import { MultipleLanguageDataItem } from "./MultipleLanguageDataItem.js";
import { SingleLanguageDataItem } from "./SingleLanguageDataItem.js";
import type { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";
export declare class LanguageDataItem {
    static from(consumer: BufferConsumer): MultipleLanguageDataItem | SingleLanguageDataItem;
}
