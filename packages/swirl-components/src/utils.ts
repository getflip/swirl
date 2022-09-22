import { EventEmitter } from "@stencil/core";

export interface FlipFormInput<ValueType = string> {
  flipAriaDescribedby?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  value?: ValueType;
  valueChange: EventEmitter;
}

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

    const slottedChildren =
      Boolean(window.HTMLSlotElement) && root instanceof HTMLSlotElement
        ? root.assignedElements()
        : [];

    const children = [...Array.from(root.children), ...slottedChildren];

    const shadowRoot = (root as Element).shadowRoot;

    const shadowRootElements = collectAllElementsDeep(selector, shadowRoot);

    const matches: HTMLElement[] = [
      ...lightDomMatches,
      ...children
        .map((match) => collectAllElementsDeep(selector, match))
        .flat(),
      ...shadowRootElements,
    ];

    return matches;
  }

  const matches = collectAllElementsDeep(selector, root).filter(
    (match, index, matches) =>
      !matches.some((m, i) => m.isSameNode(match) && i > index)
  );

  return matches;
}
