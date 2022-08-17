export function generateStoryElement(
  tag: string,
  args: { [arg: string]: any }
): HTMLElement {
  const element = document.createElement(tag);

  Object.entries(args).forEach(([attr, value]) =>
    element.setAttribute(
      attr.replace(
        /[A-Z]+(?![a-z])|[A-Z]/g,
        ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
      ),
      String(value)
    )
  );

  return element;
}
