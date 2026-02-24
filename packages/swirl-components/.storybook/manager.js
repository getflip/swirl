import { addons } from "storybook/manager-api";
import swirlTheme from "./theme";

addons.setConfig({
  panelPosition: "bottom",
  theme: swirlTheme,
});
