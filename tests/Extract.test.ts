import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { extract } from "../src/Extract.js";

describe("extract", () => {
  type Sample = [name: string, structure: unknown];

  const samples: Sample[] = [];

  it.each(samples)("extract(%s.udk)", (name, structure) => {
    expect(structure).toStrictEqual(
      extract(readFileSync(`${__dirname}/fixtures/${name}.udk`)),
    );
  });
});
