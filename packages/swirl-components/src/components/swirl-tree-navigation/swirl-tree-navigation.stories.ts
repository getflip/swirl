import { generateStoryElement } from "../../utils";
import Docs from "./swirl-tree-navigation.mdx";

export default {
  component: "swirl-tree-navigation",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Admin/SwirlTreeNavigation",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-tree-navigation", args);

  element.innerHTML = `
    <swirl-tree-navigation-item label="Home" icon='home' href='#home'></swirl-tree-navigation-item>
    <swirl-tree-navigation-item label="User Management" icon='person'>
      <swirl-tree-navigation-item label="Users" active='true' href='#users'></swirl-tree-navigation-item>
      <swirl-tree-navigation-item label="User groups" href='#user-groups'></swirl-tree-navigation-item>
    </swirl-tree-navigation-item>
    <swirl-tree-navigation-item href='https://getflip.com' target='__blank' label="File" icon='file' external='true'></swirl-tree-navigation-item>
  `;

  return element;
};

export const SwirlTreeNavigation = Template.bind({});

SwirlTreeNavigation.args = {
  label: "Label",
};
