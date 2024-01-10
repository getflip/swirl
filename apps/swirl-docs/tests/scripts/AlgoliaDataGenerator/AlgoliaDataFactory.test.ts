import AlgoliaFactory from "src/scripts/AlgoliaDataGenerator/AlgoliaDataFactory";
import { describe, expect, it } from "vitest";

describe("AlgoliaDataFactory", () => {
  it("should generate an array of records of all kinds", () => {
    const records = AlgoliaFactory.generate();
    expect(records.length).toBeGreaterThan(0);

    // Check if the records include each type in the AlgoliaRecord union
    // expect(records.some((record) => record.type === "component")).toBe(true); // no data yet, so also no implementation
    expect(records.some((record) => record.type === "icon")).toBe(true);
    expect(records.some((record) => record.type === "token")).toBe(true);
    expect(records.some((record) => record.type === "apiDoc")).toBe(true);
    expect(records.some((record) => record.type === "apiSpec")).toBe(true);
  });
});
