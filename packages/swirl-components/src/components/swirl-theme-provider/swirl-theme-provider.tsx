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

  @Event() themeChange: EventEmitter<SwirlOSThemeChangeEventData>;

  private appOSTheme: SwirlOSTheme;
  private osTheme: SwirlOSTheme;
  private recentOSThemeChangeEventData: SwirlOSThemeChangeEventData;
  private resolvedConfig: SwirlThemeProviderConfig;
  private setDesignTokens: string[] = [];

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
    if (!Boolean(this.resolvedConfig.storage)) {
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
    this.appOSTheme = (await this.getPreferredOSTheme()) || this.osTheme;

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
