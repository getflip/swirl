import { GeneratedCode } from "../../types";
import prettier from "prettier";

export function formatCode(
  language: GeneratedCode["language"],
  code: string,
): Promise<string> {
  switch (language) {
    case "TypeScript":
      return prettier.format(code, { parser: "typescript" });
    case "Dart":
      return prettier.format(code, { parser: "dart" });
    default:
      throw new Error(`Language ${language} is not supported`);
  }
}
