import { BufferBuilder } from "@triforce-heroes/triforce-core/BufferBuilder";
import { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";

import { GameObject } from "./types/GameObject.js";
import { LanguageData } from "./types/LanguageData.js";
import { LanguageDataItem } from "./types/LanguageDataItem/LanguageDataItem.js";
import { Localization } from "./types/Localization.js";
import { MonoScript } from "./types/MonoScript.js";

import type { Language } from "./types/Language.js";
import type { LanguageDataItemBase } from "./types/LanguageDataItem/LanguageDataItemBase.js";

export class LocalizationSystem {
  public readonly languages = new Map<Language, LanguageData>();

  private readonly gameObject: GameObject;

  private readonly monoScript: MonoScript;

  private readonly localization: Localization;

  private readonly languageDataItems = new Map<bigint, LanguageDataItemBase>();

  public constructor(buffer: Buffer) {
    const consumer = new BufferConsumer(buffer);

    this.gameObject = GameObject.from(consumer);
    this.monoScript = MonoScript.from(consumer);
    this.localization = Localization.from(consumer);

    for (const localizationReference of this.localization.references) {
      if (localizationReference !== -2n) {
        const languageData = LanguageData.from(consumer);

        this.languages.set(languageData.languageId, languageData);
      }
    }

    while (!consumer.isConsumed()) {
      const languageDataItem = LanguageDataItem.from(consumer);

      this.languageDataItems.set(languageDataItem.reference, languageDataItem);
    }

    for (const language of this.languages.values()) {
      language.fill(this.languageDataItems);
    }
  }

  public build() {
    const builder = new BufferBuilder();

    builder.push(this.gameObject.toBuffer());
    builder.push(this.monoScript.toBuffer());
    builder.push(this.localization.toBuffer());

    for (const language of this.languages.values()) {
      builder.push(language.toBuffer());
    }

    for (const languageDataItem of this.languageDataItems.values()) {
      builder.push(languageDataItem.toBuffer());
    }

    return builder.build();
  }
}
