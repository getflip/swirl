import { AlgoliaRecord } from "@swirl/lib/search";
import { AlgoliaRecordDataGenerator } from "./AlgoliaDataFactory";

import metadata from "@getflip/swirl-icons/dist/metadata";

export default class SwirlIconAlgoliaRecordGenerator
  implements AlgoliaRecordDataGenerator
{
  private readonly icons: typeof metadata;

  constructor() {
    this.icons = metadata;
  }

  generate(): Array<AlgoliaRecord> {
    const iconsArray = Object.keys(this.icons);

    let algoliaIndexableData: Array<AlgoliaRecord> = [];

    iconsArray?.forEach((icon: string) => {
      algoliaIndexableData.push({
        objectID: `swirl-icon-${icon}`,
        title: icon,
        type: "icon",
        path: `/icons#${icon}`,
      });
    });

    if (algoliaIndexableData.length) {
      throw new Error(`Could not generate Algolia data for category: ${123}`);
    }

    return algoliaIndexableData;
  }
}
