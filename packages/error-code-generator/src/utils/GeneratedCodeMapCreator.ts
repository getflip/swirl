import { GeneratedCode, GeneratedCodeMap } from "../types";

export class GeneratedCodeMapCreator {
  private map: GeneratedCodeMap = new Map();

  add(code: GeneratedCode) {
    if (!this.map?.has(code.language)) {
      this.map?.set(code.language, []);
    }

    const languageCodes = this.map.get(code.language);
    languageCodes?.push(code);
  }

  getMap(): GeneratedCodeMap {
    return this.map;
  }
}
