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
    <swirl-box padding="24" slot="navigation"><a href="#">Test</a></swirl-box>
    <div slot="user">User</div>
    <swirl-box center-block center-inline cover slot="content">Content</swirl-box>
    <swirl-button intent="primary" label="Button" slot="content-header-tools" variant="flat"></swirl-button>
  `;

  return element;
};

export const SwirlConsoleLayout = Template.bind({});

SwirlConsoleLayout.args = {
  appName: "App name",
  heading: "Heading",
  showBackButton: true,
  showHelpButton: true,
  subheading: "Subheading",
};

const TemplateWithBothSlots = (args) => {
  const element = generateStoryElement("swirl-console-layout", args);

  element.innerHTML = `
    <swirl-app-bar slot="app-bar" showBackButton >
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
        <a href="#" style="text-decoration: none; color: inherit;">Dashboard</a>
        <a href="#" style="text-decoration: none; color: inherit;">Users</a>
        <a href="#" style="text-decoration: none; color: inherit;">Settings</a>
      </div>
    </swirl-box>
    <div slot="user">
      <div style="display: flex; align-items: center; gap: 8px;">
        <swirl-avatar label="John Doe" size="s"></swirl-avatar>
        <swirl-text>John Doe</swirl-text>
      </div>
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
            <p>Dashboard item ${
              i + 1
            } content. This demonstrates how the layout behaves with extensive content that requires scrolling. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div style="margin-top: 12px; display: flex; gap: 8px;">
              <swirl-button label="View" variant="flat" size="sm"></swirl-button>
              <swirl-button label="Edit" variant="flat" size="sm"></swirl-button>
              ${
                i % 4 === 0
                  ? '<swirl-button label="Delete" intent="critical" variant="flat" size="sm"></swirl-button>'
                  : ""
              }
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
    <swirl-box padding="16">
      <swirl-stack align="center"justify="end" orientation="horizontal" spacing="8" width="100%" >
        <swirl-button label="Cancel" variant="flat"></swirl-button>
        <swirl-button label="Save" intent="primary"></swirl-button>
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
};
