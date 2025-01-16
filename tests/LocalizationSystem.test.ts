import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { LocalizationSystem } from "../src/LocalizationSystem.js";
import { Language } from "../src/types/Language.js";
import { LanguageData } from "../src/types/LanguageData.js";

describe("LocalizationSystem class", () => {
  it("rebuild", () => {
    const sample = readFileSync(`${__dirname}/fixtures/sample.udk`);
    const sampleSystem = new LocalizationSystem(sample);
    const sampleBuild = sampleSystem.build();

    expect(sampleBuild.toString("binary")).toStrictEqual(
      sample.toString("binary"),
    );

    const languageData = sampleSystem.languages.get(Language.ENGLISH_AMERICA)!;

    expect(languageData).instanceOf(LanguageData);
    expect(languageData.items.has(3541415184)).toBeTruthy();
    expect(languageData.items.get(3541415184)?.message).toBe(
      "Press [L+R] to Start",
    );

    languageData.setMessage(3541415184, "Aperte [L+R] para Começar");

    expect(sampleSystem.build()).not.toHaveLength(sampleBuild.length);
  }, 0);
});
