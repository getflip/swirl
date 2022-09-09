export function generateStoryElement(
  tag: string,
  args: { [arg: string]: any },
  content?: string
): HTMLElement {
  const element = document.createElement(tag);

  Object.entries(args)
    .filter((arg) => arg[1] !== undefined && arg[1] !== null && arg[1] !== "")
    .forEach(([attr, value]) => {
      if (typeof value === "object") {
        return (element[attr] = value);
      }

      return element.setAttribute(
        attr.replace(
          /[A-Z]+(?![a-z])|[A-Z]/g,
          ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
        ),
        String(value)
      );
    });

  if (Boolean(content)) {
    element.innerHTML = content;
  }

  return element;
}

export function querySelectorAllDeep(
  root: HTMLElement,
  selector: string
): HTMLElement[] {
  function collectAllElementsDeep(
    selector: string,
    root?: Element | ShadowRoot
  ): HTMLElement[] {
    if (!Boolean(root)) {
      return [];
    }

    const lightDomMatches = Array.from(
      root.querySelectorAll<HTMLElement>(selector)
    );
    const shadowRoot = (root as Element).shadowRoot;

    const shadowRootElements = collectAllElementsDeep(selector, shadowRoot);

    const matches: HTMLElement[] = [
      ...lightDomMatches,
      ...Array.from(root.children)
        .map((match) => collectAllElementsDeep(selector, match))
        .flat(),
      ...shadowRootElements,
    ];

    return matches;
  }

  return collectAllElementsDeep(selector, root);
}
