import { GeneratedCode } from "../../types";
import prettier from "prettier";

export function formatCode(
  language: GeneratedCode["language"],
  code: string
): string {
  switch (language) {
    case "TypeScript":
      return prettier.format(code, { parser: "typescript" });
    case "Dart":
      return code;
      throw new Error(
        `CodeGenerator not implemented for language: ${language}`
      );
  }
}
