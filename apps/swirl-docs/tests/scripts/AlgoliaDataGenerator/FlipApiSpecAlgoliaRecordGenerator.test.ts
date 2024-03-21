import FlipApiSpecAlgoliaRecordGenerator from "src/scripts/AlgoliaDataGenerator/FlipApiSpecAlgoliaRecordGenerator";
import { describe, expect, it } from "vitest";

describe("FlipApiSpecAlgoliaRecordGenerator", () => {
  it("should generate an array of records for api specs", () => {
    const generator = new FlipApiSpecAlgoliaRecordGenerator();
    const records = generator.generate();

    expect(records.length).toBeGreaterThan(0);

    records.forEach((record) => {
      expect(record.type).toBe("apiSpec");
      expect(record.objectID).toBeDefined();
      expect(record.title).toBeDefined();
      expect(record.excerpt).toBeDefined();
      expect(record.path).toBeDefined();
    });
  });
});
