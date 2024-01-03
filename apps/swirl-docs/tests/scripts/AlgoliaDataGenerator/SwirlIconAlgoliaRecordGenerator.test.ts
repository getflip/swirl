// SwirlTokensAlgoliaRecordGenerator.test.ts
import SwirlIconAlgoliaRecordGenerator from "src/scripts/AlgoliaDataGenerator/SwirlIconAlgoliaRecordGenerator";
import { describe, expect, it, vi } from "vitest";

vi.mock("@getflip/swirl-icons/dist/metadata", () => {
  const mockMetadata = {
    Add: {
      id: "swirl-icons-Add",
      name: "Add",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam. Lorem ipsum description.",
      usage: ["app", "admin"],
      keywords: ["Add"],
    },
    AddPhoto: {
      id: "swirl-icons-AddPhoto",
      name: "AddPhoto",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam. Lorem ipsum description.",
      usage: ["app", "admin"],
      keywords: ["AddPhoto"],
    },
    AddReaction: {
      id: "swirl-icons-AddReaction",
      name: "AddReaction",
      usage: ["app", "admin"],
      keywords: ["AddReaction"],
    },
  };

  return {
    default: mockMetadata,
  };
});

describe("SwirlIconAlgoliaRecordGenerator", () => {
  it("should generate an array of icon records", () => {
    const generator = new SwirlIconAlgoliaRecordGenerator();
    const records = generator.generate();

    expect(records).toBeInstanceOf(Array);
    expect(records.length).toBe(3);
  });

  it("should generate an array of records with the necessary properties", () => {
    const generator = new SwirlIconAlgoliaRecordGenerator();
    const records = generator.generate();

    records.forEach((record) => {
      expect(record).toHaveProperty("objectID");
      expect(record).toHaveProperty("title");
      expect(record).toHaveProperty("type");
      expect(record).toHaveProperty("path");
    });
  });
});
