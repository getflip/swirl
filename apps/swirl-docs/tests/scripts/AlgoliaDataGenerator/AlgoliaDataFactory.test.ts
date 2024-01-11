import AlgoliaFactory from "src/scripts/AlgoliaDataGenerator/AlgoliaDataFactory";
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
