import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  Watch,
} from "@stencil/core";
import { hsla, parseToHsla, toRgba } from "color2k";

export type SwirlTheme = "light" | "dark";

export type SwirlThemeChangeEventData = {
  activeTheme: SwirlTheme;
  preferredTheme: SwirlTheme | undefined;
};

export type SwirlThemeProviderStorage = {
  getItem: (key: string) => string;
  removeItem: (key: string) => void;
  setItem: (key: string, value: string) => void;
};

export type SwirlThemeProviderTenantColors = {
  primary?: string;
  primaryContrast?: string;
  secondary?: string;
  secondaryContrast?: string;
  text?: string;
};

export type SwirlThemeProviderConfig = {
  rootElement?: HTMLElement;
  storage?: SwirlThemeProviderStorage;
  tenantColors?: SwirlThemeProviderTenantColors;
};

const preferredThemeStorageKey = "swirl-preferred-theme";

const tenantColorMapping = {
  "--s-action-primary-default": "primary",
  "--s-action-primary-hovered": "primaryHovered",
  "--s-action-primary-pressed": "primaryPressed",
  "--s-text-on-action-primary": "primaryContrast",
  "--s-icon-on-action-primary": "primaryContrast",
  "--s-surface-highlight-default": "secondary",
  "--s-surface-highlight-hovered": "secondaryHovered",
  "--s-surface-highlight-pressed": "secondaryPressed",
  "--s-on-surface-highlight-default": "secondaryHovered",
  "--s-text-on-surface-highlight": "secondaryContrast",
  "--s-icon-on-surface-highlight": "secondaryContrast",
  "--s-text-highlight": "text",
  "--s-interactive-primary-default": "text",
  "--s-interactive-primary-hovered": "textHovered",
  "--s-interactive-primary-pressed": "textPressed",
};

@Component({
  scoped: true,
  styleUrl: "swirl-theme-provider.css",
  tag: "swirl-theme-provider",
})
export class SwirlThemeProvider {
  @Prop() config: SwirlThemeProviderConfig;

  @Event() themeChange: EventEmitter<SwirlThemeChangeEventData>;

  private appTheme: SwirlTheme;
  private osTheme: SwirlTheme;
  private recentThemeChangeEventData: SwirlThemeChangeEventData;
  private resolvedConfig: SwirlThemeProviderConfig;

  componentWillLoad() {
    this.resolveConfig();
    this.determineOSTheme();
    this.updateAppTheme();
  }

  @Watch("config")
  watchConfig() {
    this.resolveConfig();
    this.determineOSTheme();
    this.updateAppTheme();
  }

  /**
   * Returns the active app theme.
   * @returns FlipTheme
   */
  @Method()
  async getActiveTheme() {
    return this.appTheme;
  }

  /**
   * Returns the user's preferred theme stored in local storage.
   * @returns FlipTheme
   */
  @Method()
  async getPreferredTheme() {
    if (!Boolean(this.resolvedConfig.storage)) {
      return;
    }

    return this.resolvedConfig.storage.getItem(
      preferredThemeStorageKey
    ) as SwirlTheme | null;
  }

  /**
   * Sets the user's preferred theme and stores it in local storage. Overrides
   * the OS theme.
   */
  @Method()
  async setPreferredTheme(theme: SwirlTheme) {
    if (!Boolean(this.resolvedConfig.storage)) {
      return;
    }

    this.resolvedConfig.storage.setItem(preferredThemeStorageKey, theme);

    this.updateAppTheme();
  }

  /**
   * Resets the user's preferred theme, using the OS theme instead.
   */
  @Method()
  async resetPreferredTheme() {
    if (!Boolean(this.resolvedConfig.storage)) {
      return;
    }

    this.resolvedConfig.storage.removeItem(preferredThemeStorageKey);

    this.updateAppTheme();
  }

  private resolveConfig() {
    this.resolvedConfig = {
      ...(this.config || {}),
      rootElement: this.config?.rootElement || document.documentElement,
      storage: this.config?.storage || window?.localStorage,
    };
  }

  private determineOSTheme() {
    if (!Boolean(window.matchMedia)) {
      this.osTheme = "light";
      return;
    }

    const darkThemeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    this.osTheme = darkThemeMediaQuery.matches ? "dark" : "light";

    darkThemeMediaQuery.addEventListener("change", (e) => {
      this.osTheme = e.matches ? "dark" : "light";

      this.updateAppTheme();
    });
  }

  private async updateAppTheme() {
    this.appTheme = (await this.getPreferredTheme()) || this.osTheme;

    if (this.appTheme === "dark") {
      document.documentElement.classList.remove("theme-light");
      document.documentElement.classList.add("theme-dark");
    } else {
      document.documentElement.classList.remove("theme-dark");
      document.documentElement.classList.add("theme-light");
    }

    this.updateTenantVariables();

    const themeChangeEventData: SwirlThemeChangeEventData = {
      activeTheme: await this.getActiveTheme(),
      preferredTheme: await this.getPreferredTheme(),
    };

    if (
      !Boolean(this.recentThemeChangeEventData) ||
      themeChangeEventData.activeTheme !==
        this.recentThemeChangeEventData.activeTheme ||
      themeChangeEventData.preferredTheme !==
        this.recentThemeChangeEventData.preferredTheme
    ) {
      this.recentThemeChangeEventData = themeChangeEventData;
      this.themeChange.emit(this.recentThemeChangeEventData);
    }
  }

  private updateTenantVariables() {
    const tenantTheme = this.resolvedConfig?.tenantColors;

    if (!Boolean(tenantTheme)) {
      this.resetTenantVariables();
      return;
    }

    const rootElement = this.resolvedConfig.rootElement;

    // generate state colors (hovered, pressed) from base colors
    const primaryHsla = parseToHsla(tenantTheme.primary);
    const secondaryHsla = parseToHsla(tenantTheme.secondary);
    const textHsla = parseToHsla(tenantTheme.text);

    const primaryHovered = toRgba(
      hsla(primaryHsla[0], primaryHsla[1] - 0.21, primaryHsla[2] + 0.09, 1)
    );
    const primaryPressed = toRgba(
      hsla(primaryHsla[0], primaryHsla[1] - 0.2, primaryHsla[2] + 0.17, 1)
    );

    const secondaryHovered = toRgba(
      hsla(secondaryHsla[0], secondaryHsla[1], secondaryHsla[2] + 0.07, 1)
    );
    const secondaryPressed = toRgba(
      hsla(secondaryHsla[0], secondaryHsla[1], secondaryHsla[2] + 0.15, 1)
    );

    const textHovered = toRgba(
      hsla(textHsla[0], textHsla[1] - 0.34, textHsla[2] + 0.1, 1)
    );
    const textPressed = toRgba(
      hsla(textHsla[0], textHsla[1] - 0.48, textHsla[2] + 0.2, 1)
    );

    const tenantThemeWithGeneratedStateColors: SwirlThemeProviderTenantColors & {
      [key: string]: string;
    } = {
      ...tenantTheme,
      primaryHovered: primaryHovered,
      primaryPressed: primaryPressed,
      secondaryHovered: secondaryHovered,
      secondaryPressed: secondaryPressed,
      textHovered: textHovered,
      textPressed: textPressed,
    };

    // set custom properties for tenant theme colors
    Object.entries(tenantColorMapping).forEach(([key, value]) =>
      rootElement.style.setProperty(
        key,
        tenantThemeWithGeneratedStateColors[value]
      )
    );
  }

  private resetTenantVariables() {
    const rootElement = this.resolvedConfig.rootElement;

    [
      ...Object.keys(tenantColorMapping),
      "primaryHovered",
      "primaryPressed",
      "secondaryHovered",
      "secondaryPressed",
      "textHovered",
      "textPressed",
    ].forEach((key) => rootElement.style.removeProperty(key));
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
