import { generateStoryElement } from "../../utils";
import Docs from "./swirl-resource-list.mdx";

export default {
  component: "swirl-resource-list",
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
      label="This is a resource item"
    >
      <swirl-avatar label="John Doe" src="https://picsum.photos/id/1027/144/144" slot="media"></swirl-avatar>
    </swirl-resource-list-item>
    <swirl-resource-list-item
      description="With a description"
      label="This is a resource item"
    >
      <swirl-avatar label="John Doe" src="https://picsum.photos/id/1027/144/144" slot="media"></swirl-avatar>
    </swirl-resource-list-item>
    <swirl-resource-list-item
      description="With a description"
      label="This is a resource item"
    >
      <swirl-avatar label="John Doe" src="https://picsum.photos/id/1027/144/144" slot="media"></swirl-avatar>
    </swirl-resource-list-item>
  `;

  setTimeout(() => {
    element.innerHTML = `
    <swirl-resource-list-item
      description="With a description"
      label="This is a resource item"
    >
      <swirl-avatar label="John Doe" src="https://picsum.photos/id/1027/144/144" slot="media"></swirl-avatar>
    </swirl-resource-list-item>
    <swirl-resource-list-item
      description="With a description"
      label="This is a resource item"
    >
      <swirl-avatar label="John Doe" src="https://picsum.photos/id/1027/144/144" slot="media"></swirl-avatar>
    </swirl-resource-list-item>
    <swirl-resource-list-item
      description="With a description"
      label="This is a resource item"
    >
      <swirl-avatar label="John Doe" src="https://picsum.photos/id/1027/144/144" slot="media"></swirl-avatar>
    </swirl-resource-list-item>
    <swirl-resource-list-item
      description="With a description"
      label="New"
    >
      <swirl-avatar label="John Doe" src="https://picsum.photos/id/1027/144/144" slot="media"></swirl-avatar>
    </swirl-resource-list-item>
  `;
  }, 4000);

  return element;
};

export const SwirlResourceList = Template.bind({});

SwirlResourceList.args = {
  label: "A resource list",
};
