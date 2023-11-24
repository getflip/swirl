import { SwirlOSTheme } from "@getflip/swirl-components/dist/types/components/swirl-theme-provider/swirl-theme-provider.types";
import { BridgeMethod } from "../types";
import { BridgeRequest } from "../messaging/messaging.types";

export type GetThemeRequest = BridgeRequest<BridgeMethod.GET_THEME, undefined>;

export type GetThemeResult = {
  activeTheme: SwirlOSTheme;
  preferredTheme: SwirlOSTheme | undefined;
};
