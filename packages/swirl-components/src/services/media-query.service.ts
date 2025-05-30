import { getDesktopMediaQuery } from "../utils";

type CallbackFn = (isDesktop: boolean) => void;

class DesktopMediaQueryService {
  private mediaQueryList: MediaQueryList;
  private listeners = new Set<CallbackFn>();

  constructor() {
    this.mediaQueryList = getDesktopMediaQuery();
    this.mediaQueryList.addEventListener("change", this.onChange);
  }

  private onChange = (e: MediaQueryListEvent) => {
    this.listeners.forEach((callback) => callback(e.matches));
  };

  public subscribe(callback: CallbackFn): () => void {
    this.listeners.add(callback);
    callback(this.mediaQueryList.matches);

    return () => {
      this.listeners.delete(callback);
    };
  }
}

export const DesktopMediaQuery = new DesktopMediaQueryService();
