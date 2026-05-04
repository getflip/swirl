/**
 * Body scroll lock utility.
 *
 * - Non-iOS: sets `overflow: hidden` on body
 * - iOS: uses `position: fixed` + scroll position preservation
 *   (iOS Safari ignores `overflow: hidden` on body)
 *
 * Uses reference counting so multiple simultaneous locks are safe.
 */

type BodyStyles = {
  position: string;
  top: string;
  left: string;
  width: string;
  overflow: string;
};

const locks = new Set<WeakRef<Element>>();
let savedBodyStyles: BodyStyles | undefined;
let documentListenerAdded = false;
let initialClientY = -1;
let iosDetected: boolean | undefined;

export function disableBodyScroll(
  targetElement: Element | null | undefined
): void {
  if (!targetElement) {
    return;
  }

  if (findLockRef(targetElement)) {
    return;
  }

  locks.add(new WeakRef(targetElement));

  if (isIos()) {
    lockBodyPosition();

    (targetElement as HTMLElement).ontouchstart = (event: TouchEvent) => {
      if (event.targetTouches.length === 1) {
        initialClientY = event.targetTouches[0].clientY;
      }
    };

    (targetElement as HTMLElement).ontouchmove = (event: TouchEvent) => {
      if (event.targetTouches.length === 1) {
        handleScroll(event, targetElement);
      }
    };

    if (!documentListenerAdded) {
      document.addEventListener("touchmove", preventDefault, {
        passive: false,
      });
      documentListenerAdded = true;
    }
  } else {
    setOverflowHidden();
  }
}

export function enableBodyScroll(
  targetElement: Element | null | undefined
): void {
  if (!targetElement) {
    return;
  }

  const ref = findLockRef(targetElement);
  if (ref) {
    locks.delete(ref);
  }

  if (isIos()) {
    (targetElement as HTMLElement).ontouchstart = null;
    (targetElement as HTMLElement).ontouchmove = null;

    if (locks.size === 0) {
      if (documentListenerAdded) {
        document.removeEventListener(
          "touchmove",
          preventDefault as EventListener
        );
        documentListenerAdded = false;
      }
      restoreBodyPosition();
    }
  } else {
    if (locks.size === 0) {
      restoreOverflow();
    }
  }
}

function findLockRef(el: Element): WeakRef<Element> | undefined {
  for (const ref of locks) {
    if (ref.deref() === el) {
      return ref;
    }
  }
  return undefined;
}

function isIos(): boolean {
  if (iosDetected !== undefined) {
    return iosDetected;
  }

  if (typeof window === "undefined") {
    iosDetected = false;
    return false;
  }

  // iPhone / iPod touch
  // iPad OS 13+ reports as macOS — detect via multi-touch capability
  iosDetected =
    /iP(hone|od)/.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent));

  return iosDetected;
}

function preventDefault(event: TouchEvent): void {
  // Allow multi-touch gestures (e.g. pinch-to-zoom)
  if (event.touches.length > 1) {
    return;
  }

  event.preventDefault();
}

function handleScroll(event: TouchEvent, targetElement: Element): void {
  const clientY = event.targetTouches[0].clientY - initialClientY;

  if (targetElement.scrollTop === 0 && clientY > 0) {
    // At top of scroll, swiping down — prevent pull-to-refresh / body scroll
    preventDefault(event);
    return;
  }

  const isAtBottom =
    targetElement.scrollHeight - targetElement.scrollTop <=
    targetElement.clientHeight;

  if (isAtBottom && clientY < 0) {
    // At bottom of scroll, swiping up — prevent body scroll
    preventDefault(event);
    return;
  }

  // Allow normal scroll within target element
  event.stopPropagation();
}

function lockBodyPosition(): void {
  if (savedBodyStyles !== undefined) {
    return;
  }

  const { scrollY, scrollX, innerHeight } = window;

  savedBodyStyles = {
    position: document.body.style.position,
    top: document.body.style.top,
    left: document.body.style.left,
    width: document.body.style.width,
    overflow: document.body.style.overflow,
  };

  document.body.style.position = "fixed";
  document.body.style.top = `${-scrollY}px`;
  document.body.style.left = `${-scrollX}px`;
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";

  // On iOS Safari, applying position:fixed can cause the bottom toolbar to
  // appear/disappear, changing window.innerHeight. If the user has scrolled
  // past the first viewport, compensate so content doesn't shift.
  setTimeout(
    () =>
      requestAnimationFrame(() => {
        const bottomBarHeight = innerHeight - window.innerHeight;
        if (bottomBarHeight && scrollY >= innerHeight) {
          document.body.style.top = `${-(scrollY + bottomBarHeight)}px`;
        }
      }),
    300
  );
}

function restoreBodyPosition(): void {
  if (savedBodyStyles === undefined) {
    return;
  }

  const scrollY = -parseInt(document.body.style.top, 10);
  const scrollX = -parseInt(document.body.style.left, 10);

  document.body.style.position = savedBodyStyles.position;
  document.body.style.top = savedBodyStyles.top;
  document.body.style.left = savedBodyStyles.left;
  document.body.style.width = savedBodyStyles.width;
  document.body.style.overflow = savedBodyStyles.overflow;

  savedBodyStyles = undefined;

  window.scrollTo(scrollX, scrollY);
}

function setOverflowHidden(): void {
  if (savedBodyStyles !== undefined) {
    return;
  }

  savedBodyStyles = {
    position: document.body.style.position,
    top: document.body.style.top,
    left: document.body.style.left,
    width: document.body.style.width,
    overflow: document.body.style.overflow,
  };

  document.body.style.overflow = "hidden";
}

function restoreOverflow(): void {
  if (savedBodyStyles === undefined) {
    return;
  }

  document.body.style.overflow = savedBodyStyles.overflow;
  savedBodyStyles = undefined;
}
