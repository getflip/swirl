import { generateStoryElement } from "../../utils";
import Docs from "./swirl-resource-list.mdx";

export default {
  component: "swirl-resource-list",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlResourceList",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-resource-list", args);

  element.innerHTML = `
    <swirl-resource-list-item
      description="With a description"
      label="This is a resource item 1"
    >
      <swirl-avatar label="John Doe" size="l" src="https://picsum.photos/id/1027/144/144" slot="media"></swirl-avatar>
    </swirl-resource-list-item>
    <swirl-resource-list-item
      description="With a <strong>description</strong>"
      label="This is a <strong>resource item 2</strong>"
      meta="Yesterday"
    >
      <swirl-avatar label="John Doe" size="l" src="https://picsum.photos/id/1028/144/144" slot="media"></swirl-avatar>
    </swirl-resource-list-item>
    <swirl-resource-list-item
      description="With a description"
      label="This is a resource item 3"
    >
      <swirl-avatar label="John Doe" size="l" src="https://picsum.photos/id/1029/144/144" slot="media"></swirl-avatar>
    </swirl-resource-list-item>
  `;

  return element;
};

export const SwirlResourceList = Template.bind({});

SwirlResourceList.args = {
  label: "A resource list",
};
