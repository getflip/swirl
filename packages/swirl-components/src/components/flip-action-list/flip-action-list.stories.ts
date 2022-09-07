import { generateStoryElement } from "../../utils";
import Docs from "./flip-action-list.mdx";

export default {
  component: "flip-action-list",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipActionList",
};

const Template = (args) => {
  const element = generateStoryElement("flip-action-list", args);

  element.innerHTML = `
    <li><button type="button" role="menuitem" tabindex="-1">Menu item #1</button></li>
    <li><button type="button" role="menuitem" tabindex="-1">Menu item #2</button></li>
  `;

  return element;
};

export const FlipActionList = Template.bind({});

FlipActionList.args = {};
