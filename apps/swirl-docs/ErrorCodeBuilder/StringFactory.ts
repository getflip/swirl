export function createErrorAsConstObject(
  variableName: string,
  errorCodes: string[]
) {
  const mapObject = Object.fromEntries(
    errorCodes.map((error) => [error, error])
  );
  return `const ${variableName} = ${JSON.stringify(
    mapObject,
    null,
    2
  )} as const;`;
}

export function generateUserErrorsCode(
  endpoint: string,
  categories: string[]
): string {
  let code = `export const ${endpoint} = {\n`;

  categories.forEach((category) => {
    code += `  ...${category},\n`;
  });

  code += "} as const;";

  return code;
}
