import metadata from "@getflip/swirl-icons/dist/metadata";
import { AlgoliaRecord } from "@swirl/lib/search";
import { AlgoliaRecordDataGenerator } from "./AlgoliaDataFactory";

export default class SwirlIconAlgoliaRecordGenerator
  implements AlgoliaRecordDataGenerator
{
  private readonly icons: typeof metadata = metadata;

  generate(): Array<AlgoliaRecord> {
    const iconsArray = Object.keys(this.icons);

    let algoliaRecords: Array<AlgoliaRecord> = [];

    iconsArray?.forEach((icon: string) => {
      algoliaRecords.push({
        objectID: `swirl-icon-${icon}`,
        title: icon,
        type: "icon",
        path: `/icons#${icon}`,
      });
    });

    return algoliaRecords;
  }
}
