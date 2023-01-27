export type CommandPaletteObserver = (isOpen: boolean) => void;
function initCommandPaletteObserver(initialValue: boolean) {
  let observers: CommandPaletteObserver[] = [];
  let isOpen = initialValue;

  function get() {
    return isOpen;
  }

  function set(newValue: boolean) {
    isOpen = newValue;
    notify(newValue);
  }

  function subscribe(observer: CommandPaletteObserver) {
    observers.push(observer);
    return () => unsubscribe(observer);
  }

  function unsubscribe(observer: CommandPaletteObserver) {
    observers = observers.filter((listener) => listener !== observer);
  }

  function notify(isOpen: boolean) {
    observers.forEach((observer) => observer(isOpen));
  }

  return {
    get,
    set,
    subscribe,
    unsubscribe,
  };
}

const commandPaletteObserver = initCommandPaletteObserver(false);
export default commandPaletteObserver;
