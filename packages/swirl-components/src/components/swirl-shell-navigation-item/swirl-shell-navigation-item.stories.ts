import { generateStoryElement } from "../../utils";
import Docs from "./swirl-shell-navigation-item.mdx";

export default {
  argTypes: {
    markAsNew: {
      description:
        "Not compatible with the 'tiled' variant. Hidden if a badge label is set.",
    },
  },
  component: "swirl-shell-navigation-item",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlShellNavigationItem",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-shell-navigation-item", args);

  element.innerHTML = `
    <swirl-app-icon slot="icon" label="link" src="https://picsum.photos/id/25/200/300"></swirl-app-icon>
  `;

  element.style.width = "120px";

  return element;
};

export const SwirlShellNavigationItem = Template.bind({});

SwirlShellNavigationItem.args = {
  label: "Label",
  badgeLabel: "1",
  tiled: true,
  inlineLabel: true,
  withGradient: true,
  inlineLabelColor: "light",
};
