export type Token = {
  name: string;
  type: "color" | "size";
  value: string;
  description: string;
};

export type ColorTokenCategory =
  | "background"
  | "surface"
  | "border"
  | "action"
  | "interactive"
  | "text"
  | "icon"
  | "decoratives"
  | "core";

export type ColorTokens = {
  background?: Token[];
  surface?: Token[];
  border?: Token[];
  action?: Token[];
  interactive?: Token[];
  text?: Token[];
  icon?: Token[];
  decoratives?: Token[];
  core?: Token[];
};
