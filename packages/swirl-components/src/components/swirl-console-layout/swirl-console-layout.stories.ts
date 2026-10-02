import { generateStoryElement } from "../../utils";
import Docs from "./swirl-console-layout.mdx";

export default {
  component: "swirl-console-layout",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
    layout: "fullscreen",
  },
  title: "Admin/SwirlConsoleLayout",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-console-layout", args);

  element.innerHTML = `
    <swirl-tree-navigation label="Main" slot="navigation">
      <swirl-tree-navigation-item href="#home" icon="home" label="Home" navigation-item-id="home"></swirl-tree-navigation-item>
      <swirl-tree-navigation-item icon="person" label="User management" navigation-item-id="user-management">
        <swirl-tree-navigation-item active="true" href="#users" label="Users" navigation-item-id="users"></swirl-tree-navigation-item>
        <swirl-tree-navigation-item href="#user-groups" label="User groups" navigation-item-id="user-groups"></swirl-tree-navigation-item>
        <swirl-tree-navigation-item href="#user-attributes" label="User attributes" navigation-item-id="user-attributes"></swirl-tree-navigation-item>
        <swirl-tree-navigation-item href="#post-on-behalf" label="Post on behalf" navigation-item-id="post-on-behalf"></swirl-tree-navigation-item>
      </swirl-tree-navigation-item>
      <swirl-tree-navigation-item href="#content" icon="description" label="Content" navigation-item-id="content"></swirl-tree-navigation-item>
      <swirl-tree-navigation-item href="#analytics" icon="bar-chart" label="Analytics" navigation-item-id="analytics"></swirl-tree-navigation-item>
      <swirl-tree-navigation-item href="#settings" icon="settings" label="Settings" navigation-item-id="settings"></swirl-tree-navigation-item>
      <swirl-tree-navigation-item href="#access-security" icon="secure" label="Access &amp; security" navigation-item-id="access-security"></swirl-tree-navigation-item>
      <swirl-tree-navigation-item href="#roadmap" icon="roadmap" label="Roadmap" navigation-item-id="roadmap"></swirl-tree-navigation-item>
      <swirl-tree-navigation-item href="#excel-import" icon="upload" label="Excel import" navigation-item-id="excel-import"></swirl-tree-navigation-item>
    </swirl-tree-navigation>
    <div slot="user" style="display: flex; align-items: center; gap: 0.5rem; width: 100%; padding: 0.5rem; border-radius: 0.75rem;">
      <swirl-avatar label="Catherine Carter" size="s"></swirl-avatar>
      <swirl-text size="sm" weight="medium">Catherine Carter</swirl-text>
    </div>
    <swirl-box center-block center-inline cover slot="content">Content</swirl-box>
    <swirl-button intent="primary" label="Add user" slot="content-header-tools" variant="flat"></swirl-button>
  `;

  // Expand the "User management" item to match the design
  customElements.whenDefined("swirl-tree-navigation-item").then(async () => {
    const userManagementItem = element.querySelector(
      '[navigation-item-id="user-management"]'
    ) as HTMLSwirlTreeNavigationItemElement;

    await userManagementItem?.componentOnReady();
    await userManagementItem?.expand();
  });

  return element;
};

export const SwirlConsoleLayout = Template.bind({});

SwirlConsoleLayout.args = {
  heading: "Users",
  logoText: "Admin Console",
  maxContentWidth: "1200px",
};

const TemplateWithBothSlots = (args) => {
  const element = generateStoryElement("swirl-console-layout", args);

  element.innerHTML = `
    <swirl-app-bar slot="app-bar">
      <swirl-button
        slot="heading"
        icon="<swirl-icon-arrow-back></swirl-icon-arrow-back>"
        label="Back"
        variant="ghost"
      ></swirl-button>
      <swirl-stack justify="center" orientation="horizontal" spacing="8" slot="center-controls">
        <swirl-button label="All posts" variant="flat"></swirl-button>
        <swirl-button label="Groups"></swirl-button>
        <swirl-button label="Saved"></swirl-button>
        <swirl-button label="Scheduled"></swirl-button>
      </swirl-stack>
      <div slot="right-controls">
        <swirl-button hide-label="true" icon="<swirl-icon-more-vertikal></swirl-icon-more-vertikal>" label="Search"></swirl-button>
      </div>
    </swirl-app-bar>
    <swirl-box padding="24" slot="navigation">
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <a href="#">Dashboard</a>
        <a href="#">Users</a>
        <a href="#">Settings</a>
      </div>
    </swirl-box>
    <div slot="user">
      <swirl-box padding-inline-end="16" height="100%">
        <swirl-stack justify="center" align="center" height="100%">
          <swirl-stack align="center" orientation="horizontal" spacing="8">
            <swirl-avatar label="John Doe" size="s"></swirl-avatar>
            <swirl-text>John Doe</swirl-text>
          </swirl-stack>
        </swirl-stack>
    </swirl-box>
    </div>
    <div slot="content">
      <div style="padding: 20px;">
        <swirl-heading level="2" text="Complete Layout - Scroll Test"></swirl-heading>
        <p>This tests both custom app-bar and footer with extensive scrollable content. Both header and footer should maintain their positions.</p>

        <div style="margin: 20px 0; padding: 20px; background: #f0f8ff; border-radius: 8px;">
          <swirl-heading level="3" text="Dashboard Overview"></swirl-heading>
          <p>Welcome to your dashboard. This content area will scroll while the custom app-bar stays fixed at top and footer at bottom.</p>
        </div>

        ${Array.from(
          { length: 10 },
          (_, i) => `
          <div style="margin: 16px 0; padding: 16px; border-left: 4px solid #007acc; background: #fafafa;">
            <swirl-heading level="4" text="Dashboard Item ${
              i + 1
            }"></swirl-heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div style="margin-top: 12px; display: flex; gap: 8px;">
              <swirl-button label="View" variant="flat" size="sm"></swirl-button>
              <swirl-button label="Edit" variant="flat" size="sm"></swirl-button>
              <swirl-button label="Delete" intent="critical" variant="flat" size="sm"></swirl-button>
            </div>
          </div>
        `
        ).join("")}

        <div style="margin: 30px 0; padding: 20px; background: #e8f5e8; border-radius: 8px;">
          <swirl-text weight="medium">Scroll Test Complete</swirl-text>
          <p>You've scrolled through all the content. The footer should be visible below!</p>
        </div>
      </div>
    </div>
    <div slot="footer" style="width: 100%;">
    <swirl-box padding-inline-end="16" height="100%" >
    <swirl-stack justify="center" align="center" height="100%">
      <swirl-stack align="center"justify="end" orientation="horizontal" spacing="8" width="100%" >
        <swirl-button label="Cancel" variant="flat"></swirl-button>
        <swirl-button label="Save" intent="primary" variant="flat"></swirl-button>
      </swirl-stack>
      </swirl-stack>
      </swirl-box>
    </div>
  `;

  return element;
};

export const WithCustomAppBarAndFooter = TemplateWithBothSlots.bind({});

WithCustomAppBarAndFooter.args = {
  heading: "Dashboard Content",
  subheading: "Complete custom layout example",
  maxContentWidth: "600px",
};
