/**
 * From TSX source, find @Prop() class members. Required when the property has no `?` and no `= default`.
 */
export function getRequiredPropNamesFromTsx(tsxContent: string): Set<string> {
  const required = new Set<string>();
  // Match @Prop() ... name or name? or name! ... : type [= default];
  const propRe =
    /@Prop\s*\(\s*[^)]*\)\s*(?:readonly\s+)?(\w+)(\??)\s*!?\s*:\s*[^=;]+(?:=\s*[^;]+)?\s*;/g;
  let m: RegExpExecArray | null;

  while ((m = propRe.exec(tsxContent)) !== null) {
    const propName = m[1];
    const optional = m[2] === "?";
    const hasDefault = m[0].includes(" = ");

    if (!optional && !hasDefault) {
      required.add(propName);
    }
  }

  return required;
}
