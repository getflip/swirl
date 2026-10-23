import { generateStoryElement } from "../../utils";
import Docs from "./swirl-sidebar-navigation.mdx";

export default {
  component: "swirl-sidebar-navigation",
  decorators: [
    (story) => {
      const container = document.createElement("div");
      const sidebarContainer = document.createElement("div");

      container.style.background =
        "linear-gradient(162deg, #e8f1ff 10.92%, #d9e5ff 84.6%)";
      container.style.boxSizing = "border-box";
      container.style.height = "100vh";
      container.style.padding = "0.5rem";

      sidebarContainer.style.height = "100%";
      sidebarContainer.style.width = "296px";

      sidebarContainer.appendChild(story());
      container.appendChild(sidebarContainer);

      return container;
    },
  ],
  parameters: {
    docs: {
      page: Docs,
    },
    layout: "fullscreen",
  },
  title: "Components/SwirlSidebarNavigation",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-sidebar-navigation", args);

  element.innerHTML = `
    <swirl-tree-navigation label="Main">
      <swirl-tree-navigation-item href="#home" icon="home" label="Home" navigation-item-id="home"></swirl-tree-navigation-item>
      <swirl-tree-navigation-item icon="person" label="User management" navigation-item-id="user-management">
        <swirl-tree-navigation-item active="true" href="#users" label="Users" navigation-item-id="users"></swirl-tree-navigation-item>
        <swirl-tree-navigation-item href="#user-groups" label="User groups" navigation-item-id="user-groups"></swirl-tree-navigation-item>
      </swirl-tree-navigation-item>
      <swirl-tree-navigation-item href="#settings" icon="settings" label="Settings" navigation-item-id="settings"></swirl-tree-navigation-item>
    </swirl-tree-navigation>
    <div slot="user" style="display: flex; align-items: center; gap: 0.5rem; width: 100%; padding: 0.5rem; border-radius: 0.75rem;">
      <swirl-avatar label="Catherine Carter" size="s"></swirl-avatar>
      <swirl-text size="sm" weight="medium">Catherine Carter</swirl-text>
    </div>
  `;

  return element;
};

export const SwirlSidebarNavigation = Template.bind({});

SwirlSidebarNavigation.args = {
  appName: "Fusion",
};

export const Elevated = Template.bind({});

Elevated.args = {
  appName: "Fusion",
  elevated: true,
};
