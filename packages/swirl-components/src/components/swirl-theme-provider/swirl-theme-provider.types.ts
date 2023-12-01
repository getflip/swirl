export type SwirlOSTheme = "light" | "dark";

export type SwirlOSThemeChangeEventData = {
  activeTheme: SwirlOSTheme;
  preferredTheme: SwirlOSTheme | undefined;
};

export type SwirlThemeProviderStorage = {
  getItem: (key: string) => string;
  removeItem: (key: string) => void;
  setItem: (key: string, value: string) => void;
};

export type SwirlThemeProviderConfig = {
  rootElement?: HTMLElement;
  storage?: SwirlThemeProviderStorage;
  themes?: SwirlThemes;
};

// Branding theme types compatible with the v4 Branding API

export type SwirlThemes = {
  dark: SwirlTheme;
  light: SwirlTheme;
};

export type SwirlTheme = {
  company_icon: SwirlThemeIcon;
  company_logo: SwirlThemeImage;
  design_tokens: Array<SwirlThemeDesignToken>;
  favicon: SwirlThemeIcon;
};

export type SwirlThemeIcon = {
  file_name: string;
  id: string;
  link: string;
};

export type SwirlThemeImage = {
  file_name: string;
  id: string;
  link: string;
};

export type SwirlThemeDesignToken = {
  color: SwirlThemeRgbaColor;
  id: string;
};

export type SwirlThemeRgbaColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};
