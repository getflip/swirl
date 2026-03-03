import { addons } from "storybook/manager-api";
import swirlTheme from "./theme";

addons.setConfig({
  layoutCustomisations: {
    showPanel(state, defaultValue) {
      if (!state.storyId?.startsWith("components-")) {
        return false;
      }

      return defaultValue;
    },
  },
  panelPosition: "bottom",
  theme: swirlTheme,
});
