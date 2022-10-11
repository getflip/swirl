import { generateStoryElement } from "../../utils";
import Docs from "./flip-resource-list.mdx";

export default {
  component: "flip-resource-list",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipResourceList",
};

const Template = (args) => {
  const element = generateStoryElement("flip-resource-list", args);

  element.innerHTML = `
    <flip-resource-list-item
      description="With a description"
      label="This is a resource item"
      media="<flip-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/433/144/144&quot;></flip-avatar>"
    ></flip-resource-list-item>
    <flip-resource-list-item
      description="With a description"
      label="This is a resource item"
      media="<flip-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/103/144/144&quot;></flip-avatar>"
    ></flip-resource-list-item>
    <flip-resource-list-item
      description="With a description"
      label="This is a resource item"
      media="<flip-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/1027/144/144&quot;></flip-avatar>"
    ></flip-resource-list-item>
  `;

  return element;
};

export const FlipResourceList = Template.bind({});

FlipResourceList.args = {
  label: "A resource list",
};
