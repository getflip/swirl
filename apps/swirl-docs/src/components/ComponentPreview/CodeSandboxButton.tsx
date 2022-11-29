import { FlipIconOpenInNew } from "@getflip/swirl-components-react";
import { FunctionComponent } from "react";
import { getParameters } from "codesandbox/lib/api/define";

const getAppCode = (code: string) => {
  const lineWithFunctionName = code
    .split("\n")
    .filter((name) => name.match(/function .*Example/g))?.[0];
  const functionName = lineWithFunctionName
    ? lineWithFunctionName.replace("function ", "").replace("() {", "")
    : "Example";
  const exportLine = `export default ${functionName};`;
  let appCode = "";

  appCode += code;
  appCode += "\n";
  appCode += exportLine;

  return appCode;
};

const getIndexHtmlCode = (code: string) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
    <link href="src/styles.css"></link>
    <script src="src/index.js"></script>
  </head>

  <body>
  ${code}
  </body>
</html>
`;
};

const stylesCSS = `
@import url("https://cdn.jsdelivr.net/npm/@getflip/swirl-components/dist/swirl-components/swirl-components.css");
`;

const indexCode = `
import { defineCustomElements } from "@getflip/swirl-components/loader";

defineCustomElements();
`;

interface CodeSandboxButtonProps {
  code: string;
}

export const CodeSandboxButton: FunctionComponent<CodeSandboxButtonProps> = ({
  code,
}) => {
  const parameters = getParameters({
    files: {
      "package.json": {
        content: {
          dependencies: {
            "@getflip/swirl-components": "latest",
            "parcel-bundler": "latest",
          },
        } as any,
        isBinary: false,
      },
      "src/index.js": {
        content: indexCode,
        isBinary: false,
      },
      "src/styles.css": {
        content: stylesCSS,
        isBinary: false,
      },
      "index.html": {
        content: getIndexHtmlCode(code),
        isBinary: false,
      },
    },
  });

  return (
    <form
      action="https://codesandbox.io/api/v1/sandboxes/define"
      method="POST"
      target="_blank"
    >
      <input type="hidden" name="parameters" value={parameters} />
      <button
        type="submit"
        className="flex justify-center items-center text-[#F2F2F2] text-base font-medium"
      >
        edit in sandbox
        <FlipIconOpenInNew className="ml-1" size={16} />
      </button>
    </form>
  );
};
