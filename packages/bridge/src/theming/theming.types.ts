import { FlipTheme } from "@getflip/swirl-components/dist/types/components/flip-theme-provider/flip-theme-provider";
import { BridgeMethod } from "../types";
import { BridgeRequest } from "../messaging/messaging.types";

export type GetThemeRequest = BridgeRequest<BridgeMethod.GET_THEME, undefined>;

export type GetThemeResult = {
  activeTheme: FlipTheme;
  preferredTheme: FlipTheme | undefined;
};
