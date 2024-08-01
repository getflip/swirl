import { generateStoryElement } from "../../utils";
import Docs from "./swirl-shell-navigation-item.mdx";

export default {
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
    <swirl-app-icon slot="icon" label="link" src="https://picsum.photos/id/237/200/300"></swirl-app-icon>
  `;

  return element;
};

export const SwirlShellNavigationItem = Template.bind({});

SwirlShellNavigationItem.args = {
  label: "Label",
  badgeLabel: "1",
};
