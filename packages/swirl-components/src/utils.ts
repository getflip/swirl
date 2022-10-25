import { EventEmitter } from "@stencil/core";

export interface FlipFormInput<ValueType = string> {
  flipAriaDescribedby?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  value?: ValueType;
  valueChange: EventEmitter<ValueType>;
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

export function getVisibleHeight(element: HTMLElement, container: HTMLElement) {
  const scrollTop = container.scrollTop;
  const scrollBot = scrollTop + container.clientHeight;
  const containerRect = container.getBoundingClientRect();
  const eleRect = element.getBoundingClientRect();
  const rect = {
    top: eleRect.top - containerRect.top,
    right: eleRect.right - containerRect.right,
    bottom: eleRect.bottom - containerRect.bottom,
    left: eleRect.left - containerRect.left,
  };

  const eleTop = rect.top + scrollTop;
  const eleBot = eleTop + element.offsetHeight;
  const visibleTop = eleTop < scrollTop ? scrollTop : eleTop;
  const visibleBot = eleBot > scrollBot ? scrollBot : eleBot;

  return visibleBot - visibleTop;
}

export function isMobileViewport() {
  return !window.matchMedia("(min-width: 768px)").matches;
}

export function querySelectorAllDeep<TargetType extends Element = HTMLElement>(
  root: HTMLElement,
  selector: string
): TargetType[] {
  function collectAllElementsDeep(
    selector: string,
    root?: Element | ShadowRoot
  ): TargetType[] {
    if (!Boolean(root)) {
      return [];
    }

    const lightDomMatches = Array.from(
      root.querySelectorAll<TargetType>(selector)
    );

    const slottedChildren =
      Boolean(window.HTMLSlotElement) && root instanceof HTMLSlotElement
        ? root.assignedElements()
        : [];

    const children = [...Array.from(root.children), ...slottedChildren];

    const shadowRoot = (root as Element).shadowRoot;

    const shadowRootElements = collectAllElementsDeep(selector, shadowRoot);

    const matches: TargetType[] = [
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
