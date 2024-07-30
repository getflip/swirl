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
import {
  SwirlOSTheme,
  SwirlOSThemeChangeEventData,
  SwirlThemeProviderConfig,
} from "./swirl-theme-provider.types";

const preferredThemeStorageKey = "swirl-preferred-theme";

@Component({
  scoped: true,
  styleUrl: "swirl-theme-provider.css",
  tag: "swirl-theme-provider",
})
export class SwirlThemeProvider {
  @Prop() config: SwirlThemeProviderConfig;

  @Event() appThemeUpdated: EventEmitter<void>;
  @Event() themeChange: EventEmitter<SwirlOSThemeChangeEventData>;

  private appOSTheme: SwirlOSTheme;
  private darkThemeMediaQuery = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );
  private osTheme: SwirlOSTheme;
  private recentOSThemeChangeEventData: SwirlOSThemeChangeEventData;
  private resolvedConfig: SwirlThemeProviderConfig;
  private setDesignTokens: string[] = [];

  componentWillLoad() {
    this.resolveConfig();
    this.determineOSTheme();
    this.updateAppTheme();
  }

  disconnectedCallback() {
    this.darkThemeMediaQuery.removeEventListener(
      "change",
      this.osThemeChangeHandler
    );
  }

  @Watch("config")
  watchConfig() {
    this.resolveConfig();
    this.determineOSTheme();
    this.updateAppTheme();
  }

  /**
   * Returns the active OS theme.
   * @returns SwirlTheme
   */
  @Method()
  async getActiveOSTheme() {
    return this.appOSTheme;
  }

  /**
   * Returns the user's preferred OS theme stored in local storage.
   * @returns SwirlTheme
   */
  @Method()
  async getPreferredOSTheme() {
    if (!Boolean(this.resolvedConfig.storage)) {
      return;
    }

    return this.resolvedConfig.storage.getItem(
      preferredThemeStorageKey
    ) as SwirlOSTheme | null;
  }

  /**
   * Sets the user's preferred OS theme and stores it in local storage. Overrides
   * the system theme.
   */
  @Method()
  async setPreferredOSTheme(theme: SwirlOSTheme) {
    if (
      !Boolean(this.resolvedConfig.storage) ||
      !this.resolvedConfig.enabledThemes.includes(theme)
    ) {
      return;
    }

    this.resolvedConfig.storage.setItem(preferredThemeStorageKey, theme);

    this.updateAppTheme();
  }

  /**
   * Resets the user's preferred OS theme, using the system theme instead.
   */
  @Method()
  async resetPreferredOSTheme() {
    if (!Boolean(this.resolvedConfig.storage)) {
      return;
    }

    this.resolvedConfig.storage.removeItem(preferredThemeStorageKey);

    this.updateAppTheme();
  }

  private resolveConfig() {
    this.resolvedConfig = {
      ...(this.config || {}),
      enabledThemes: this.config?.enabledThemes || ["light", "dark"],
      rootElement: this.config?.rootElement || document.documentElement,
      storage: this.config?.storage || window?.localStorage,
    };

    if (!this.resolvedConfig.enabledThemes.includes("light")) {
      throw new Error("[Swirl Theme Provider] Light theme must be enabled.");
    }
  }

  private determineOSTheme() {
    if (!Boolean(window.matchMedia)) {
      this.osTheme = "light";
      return;
    }

    this.osTheme = this.darkThemeMediaQuery.matches ? "dark" : "light";

    this.darkThemeMediaQuery.removeEventListener(
      "change",
      this.osThemeChangeHandler
    );

    this.darkThemeMediaQuery.addEventListener(
      "change",
      this.osThemeChangeHandler
    );
  }

  private osThemeChangeHandler = (e: MediaQueryListEvent) => {
    this.osTheme = e.matches ? "dark" : "light";

    this.updateAppTheme();
  };

  private async updateAppTheme() {
    const newAppOSTheme = (await this.getPreferredOSTheme()) || this.osTheme;

    if (!this.resolvedConfig.enabledThemes.includes(newAppOSTheme)) {
      this.appOSTheme = "light";
    } else {
      this.appOSTheme = newAppOSTheme;
    }

    if (this.appOSTheme === "dark") {
      document.documentElement.classList.remove("theme-light");
      document.documentElement.classList.add("theme-dark");
    } else {
      document.documentElement.classList.remove("theme-dark");
      document.documentElement.classList.add("theme-light");
    }

    this.updateTenantVariables();
    this.updateTenantAssets();

    const themeChangeEventData: SwirlOSThemeChangeEventData = {
      activeTheme: await this.getActiveOSTheme(),
      preferredTheme: await this.getPreferredOSTheme(),
    };

    if (
      !Boolean(this.recentOSThemeChangeEventData) ||
      themeChangeEventData.activeTheme !==
        this.recentOSThemeChangeEventData.activeTheme ||
      themeChangeEventData.preferredTheme !==
        this.recentOSThemeChangeEventData.preferredTheme
    ) {
      this.recentOSThemeChangeEventData = themeChangeEventData;
      this.themeChange.emit(this.recentOSThemeChangeEventData);
    }

    this.appThemeUpdated.emit();
  }

  private updateTenantAssets() {
    const theme = this.resolvedConfig?.themes?.[this.appOSTheme];

    if (!Boolean(theme)) {
      return;
    }

    document.head
      .querySelector('link[rel="icon"]')
      ?.setAttribute("href", theme.favicon.link);
  }

  private updateTenantVariables() {
    const theme = this.resolvedConfig?.themes?.[this.appOSTheme];

    if (!Boolean(theme)) {
      this.resetTenantVariables();
      return;
    }

    const rootElement = this.resolvedConfig.rootElement;

    this.setDesignTokens = [];

    theme.design_tokens.forEach((token) => {
      const propertyName = `--s-${token.id}`;

      rootElement.style.setProperty(
        propertyName,
        `rgba(${token.color.r}, ${token.color.g}, ${token.color.b}, ${token.color.a})`
      );

      this.setDesignTokens.push(propertyName);
    });
  }

  private resetTenantVariables() {
    const rootElement = this.resolvedConfig.rootElement;

    this.setDesignTokens.forEach((property) => {
      rootElement.style.removeProperty(property);
    });

    this.setDesignTokens = [];
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
