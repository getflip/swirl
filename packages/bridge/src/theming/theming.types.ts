import { SwirlOSTheme } from "@getflip/swirl-components/dist/types/components/swirl-theme-provider/swirl-theme-provider.types";
import { BridgeRequest } from "../messaging/messaging.types";
import { BridgeMethod } from "../types";

export type GetThemeRequest = BridgeRequest<BridgeMethod.GET_THEME, undefined>;

export type GetThemeResult = {
  activeTheme: SwirlOSTheme;
  preferredTheme: SwirlOSTheme | undefined;
};

export type SetThemeRequest = BridgeRequest<
  BridgeMethod.SET_THEME,
  { theme: SwirlOSTheme | undefined }
>;

export type SetThemeResult = SwirlOSTheme | undefined;
