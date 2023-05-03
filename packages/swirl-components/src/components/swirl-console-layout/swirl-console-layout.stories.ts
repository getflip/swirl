import { generateStoryElement } from "../../utils";
import Docs from "./swirl-console-layout.mdx";

export default {
  component: "swirl-console-layout",
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
