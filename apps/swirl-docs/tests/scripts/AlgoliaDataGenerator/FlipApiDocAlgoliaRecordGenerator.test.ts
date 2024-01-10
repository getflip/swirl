import FlipApiDocAlgoliaRecordGenerator from "src/scripts/AlgoliaDataGenerator/FlipApiDocAlgoliaRecordGenerator";
import { describe, expect, it } from "vitest";

describe("FlipApiDocAlgoliaRecordGenerator", () => {
  it("should return an array of AlgoliaRecords", () => {
    const generator = new FlipApiDocAlgoliaRecordGenerator();
    const records = generator.generate();
    expect(records.length).toBeGreaterThan(0);

    records.forEach((record) => {
      expect(record.type).toBe("apiDoc");
      expect(record.title).toBeDefined();
      expect(record.path).toBeDefined();
      expect(record.objectID).toBeDefined();
    });
  });
});
