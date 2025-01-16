import { MultipleLanguageDataItem } from "./MultipleLanguageDataItem.js";
import { SingleLanguageDataItem } from "./SingleLanguageDataItem.js";

import type { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class LanguageDataItem {
  public static from(consumer: BufferConsumer) {
    const reference = consumer.readInt64();

    const className = consumer.readLengthPrefixedString(4);
    consumer.skipPadding(4);

    const projectName = consumer.readLengthPrefixedString(4);
    consumer.skipPadding(4);

    // String "Assembly-CSharp"
    consumer.readLengthPrefixedString(4);
    consumer.skipPadding(4);

    return className === "SingleLanguageDataItem"
      ? SingleLanguageDataItem.from(reference, projectName, consumer)
      : MultipleLanguageDataItem.from(reference, projectName, consumer);
  }
}
