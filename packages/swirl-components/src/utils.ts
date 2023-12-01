import { EventEmitter } from "@stencil/core";

export interface SwirlFormInput<ValueType = string> {
  disabled?: boolean;
  invalid?: boolean;
  swirlAriaDescribedby?: string;
  required?: boolean;
  value?: ValueType;
  valueChange: EventEmitter<ValueType>;
}

export function closestPassShadow(node, selector) {
  if (!node) {
    return null;
  }

  if (node instanceof ShadowRoot) {
    return closestPassShadow(node.host, selector);
  }

  if (node instanceof HTMLElement) {
    if (node.matches(selector)) {
      return node;
    } else {
      return closestPassShadow(node.parentNode, selector);
    }
  }

  return closestPassShadow(node.parentNode, selector);
}

export function getActiveElement(
  root: Document | ShadowRoot = document
): Element | undefined {
  const activeEl = root.activeElement;

  if (!Boolean(activeEl)) {
    return undefined;
  }

  if (Boolean(activeEl.shadowRoot)) {
    return getActiveElement(activeEl.shadowRoot);
  } else {
    return activeEl;
  }
}

export const getDesktopMediaQuery = () =>
  document.documentElement.classList.contains("disable-desktop-style-tweaks")
    ? window.matchMedia(null)
    : window.matchMedia(
        "(min-width: 992px) and (max-width: 1439px) and (hover: hover), (min-width: 1440px)"
      );

export function debounce(
  func: Function,
  wait: number,
  immediate: boolean = false
): any {
  let timeout: NodeJS.Timeout;

  return async function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;

      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !Boolean(timeout);

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

export function fullscreenStoryDecorator(padded = true) {
  return (story: any) => {
    const container = document.createElement("div");
    const styles = document.createElement("style");
    const script = document.createElement("script");

    container.classList.add("container");
    container.style.backgroundColor = "var(--s-surface-raised-default)";
    container.style.height = "100vh";

    if (padded) {
      styles.innerHTML = `
      @media (min-width: 1440px) {
        .container {
          padding: 1rem;
        }
      }
    `;
    }

    script.innerHTML = `
    if (!window.updateContainerHeight) {
      window.updateContainerHeight = () => {
        document.querySelector('.container').style.height = window.innerHeight+'px';
      };

      window.addEventListener('resize', window.updateContainerHeight);
    }

    window.updateContainerHeight();
  `;

    container.append(styles, story(), script);

    return container;
  };
}

export function generateStoryElement(
  tag: string,
  args: { [arg: string]: any },
  content?: string
): HTMLElement {
  const element = document.createElement(tag);

  Object.entries(args)
    .filter(
      (arg) =>
        arg[1] !== undefined &&
        arg[1] !== null &&
        arg[1] !== "" &&
        arg[0] !== "slot"
    )
    .forEach(([attr, value]) => {
      if (typeof value === "object") {
        element[attr] = value;
        return;
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

export function parentsPassShadow(node, selector, matches = []) {
  if (!node) {
    return matches;
  }

  if (node instanceof ShadowRoot) {
    return parentsPassShadow(node.host, selector, matches);
  }

  if (node instanceof HTMLElement) {
    if (node.matches(selector)) {
      return parentsPassShadow(node.parentNode, selector, [...matches, node]);
    } else {
      return parentsPassShadow(node.parentNode, selector, matches);
    }
  }

  return parentsPassShadow(node.parentNode, selector, matches);
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

export function removeTimezoneOffset(date: Date): Date {
  const newDate = new Date(date);

  newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());

  return newDate;
}
