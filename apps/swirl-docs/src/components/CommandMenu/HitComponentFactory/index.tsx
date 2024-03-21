import { AlgoliaRecord } from "@swirl/lib/search";
import { useHits } from "react-instantsearch-hooks-web";
import { ApiSpecHitsGenerator } from "./ApiSpecHitsGenerator";
import { ComponentHitsGenerator } from "./ComponentHitsGenerator";
import { IconHitsGenerator } from "./IconHitsGenerator";
import { TokenHitsGenerator } from "./TokenHitsGenerator";

export type AlgoliaRecordHits = ReturnType<
  typeof useHits<AlgoliaRecord>
>["hits"];

export interface HitComponentGenerator {
  type: AlgoliaRecord["type"];
  generateHits(hits: AlgoliaRecordHits, onSelected?: () => void): JSX.Element;
}

class HitComponentFactory {
  hasHits: Boolean;

  constructor() {
    this.hasHits = false;
  }

  getHitComponents(
    hits: AlgoliaRecordHits,
    onSelected?: () => void
  ): Record<AlgoliaRecord["type"], JSX.Element> {
    const hitComponents: Record<AlgoliaRecord["type"], JSX.Element> = {
      icon: <></>,
      token: <></>,
      component: <></>,
      apiSpec: <></>,
      apiDoc: <></>,
    };

    const hitGenerators: HitComponentGenerator[] = [
      new IconHitsGenerator(),
      new TokenHitsGenerator(),
      new ComponentHitsGenerator(),
      new ApiSpecHitsGenerator(),
    ];

    const assignedHits = this.assignHitsToAlgoliaRecordTypes(hits);

    Object.entries(assignedHits).forEach(([type, hits]) => {
      const hitGenerator = hitGenerators.find(
        (hitGenerator) => hitGenerator.type === type
      );

      if (hitGenerator) {
        hitComponents[type as unknown as AlgoliaRecord["type"]] =
          hitGenerator.generateHits(hits, onSelected);
      }
    });

    return hitComponents;
  }

  private assignHitsToAlgoliaRecordTypes(hits: AlgoliaRecordHits) {
    const result: Record<AlgoliaRecord["type"], AlgoliaRecordHits> = {
      icon: [],
      token: [],
      component: [],
      apiSpec: [],
      apiDoc: [],
    };

    hits.forEach((hit) => {
      switch (hit.type) {
        case "icon":
          result.icon.push(hit);
          break;
        case "token":
          result.token.push(hit);
          break;
        case "component":
          result.component.push(hit);
          break;
        case "apiSpec":
          result.apiSpec.push(hit);
          break;
        case "apiDoc":
          result.apiDoc.push(hit);
          break;
      }
    });

    this.hasHits = hits.length > 0;
    return result;
  }
}
const hitComponentFactory = new HitComponentFactory();
export default hitComponentFactory;
