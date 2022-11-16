import { generateStoryElement } from "../../utils";
import Docs from "./flip-console-layout.mdx";

export default {
  component: "flip-console-layout",
  parameters: {
    docs: {
      page: Docs,
    },
    layout: "fullscreen",
  },
  title: "Admin/FlipConsoleLayout",
};

const Template = (args) => {
  const element = generateStoryElement("flip-console-layout", args);

  element.innerHTML = `
    <flip-box padding="24" slot="navigation">Navigation</flip-box>
    <div slot="user">User</div>
    <div slot="content">Content</div>
  `;

  return element;
};

export const FlipConsoleLayout = Template.bind({});

FlipConsoleLayout.args = {
  appName: "App name",
  heading: "Heading",
  showBackButton: true,
  showHelpButton: true,
  subheading: "Subheading",
};
