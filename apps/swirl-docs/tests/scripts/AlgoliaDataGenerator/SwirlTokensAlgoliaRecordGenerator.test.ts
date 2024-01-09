// SwirlTokensAlgoliaRecordGenerator.test.ts
import SwirlTokensAlgoliaRecordGenerator from "src/scripts/AlgoliaDataGenerator/SwirlTokensAlgoliaRecordGenerator";
import { describe, expect, it } from "vitest";

describe("SwirlTokensAlgoliaRecordGenerator", () => {
  it("should generate a combined array of color and token records", () => {
    const generator = new SwirlTokensAlgoliaRecordGenerator();
    const records = generator.generate();

    expect(records).toBeInstanceOf(Array);
    expect(records.length).toBeGreaterThan(0);
  });

  it("should generate a combined array of color and token records with the correct necessary properties", () => {
    const generator = new SwirlTokensAlgoliaRecordGenerator();
    const records = generator.generate();

    records.forEach((record) => {
      expect(record).toHaveProperty("objectID");
      expect(record).toHaveProperty("title");
      expect(record).toHaveProperty("type");
      expect(record).toHaveProperty("tokenCategory");
      expect(record).toHaveProperty("excerpt");
      expect(record).toHaveProperty("path");
    });
  });
});
