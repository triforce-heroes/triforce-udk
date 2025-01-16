import { LanguageData } from "./types/LanguageData.js";
import type { Language } from "./types/Language.js";
export declare class LocalizationSystem {
    readonly languages: Map<Language, LanguageData>;
    private readonly gameObject;
    private readonly monoScript;
    private readonly localization;
    private readonly languageDataItems;
    constructor(buffer: Buffer);
    build(): Buffer<ArrayBuffer>;
}
