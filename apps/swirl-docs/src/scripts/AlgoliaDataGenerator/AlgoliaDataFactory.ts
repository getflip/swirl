import { AlgoliaRecord } from "@swirl/lib/search";
import FlipApiDocAlgoliaRecordGenerator from "./FlipApiDocAlgoliaRecordGenerator";
import FlipApiSpecAlgoliaRecordGenerator from "./FlipApiSpecAlgoliaRecordGenerator";
import SwirlIconAlgoliaRecordGenerator from "./SwirlIconAlgoliaRecordGenerator";
import SwirlTokensAlgoliaRecordGenerator from "./SwirlTokensAlgoliaRecordGenerator";

export interface AlgoliaRecordDataGenerator {
  generate(): Array<AlgoliaRecord>;
}

export class AlgoliaDataFactory {
  private readonly generators: Array<AlgoliaRecordDataGenerator>;

  constructor(generators: Array<AlgoliaRecordDataGenerator>) {
    this.generators = generators;
  }

  generate(): Array<AlgoliaRecord> {
    return this.generators.map((generator) => generator.generate()).flat();
  }
}

const AlgoliaFactory = new AlgoliaDataFactory([
  new SwirlIconAlgoliaRecordGenerator(),
  new SwirlTokensAlgoliaRecordGenerator(),
  new FlipApiSpecAlgoliaRecordGenerator(),
  new FlipApiDocAlgoliaRecordGenerator(),
]);

export default AlgoliaFactory;
