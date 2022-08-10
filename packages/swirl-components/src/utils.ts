export function generateStoryElement(
  tag: string,
  args: { [arg: string]: any }
): HTMLElement {
  const element = document.createElement(tag);

  Object.entries(args).forEach(([attr, value]) =>
    element.setAttribute(attr, String(value))
  );

  return element;
}
