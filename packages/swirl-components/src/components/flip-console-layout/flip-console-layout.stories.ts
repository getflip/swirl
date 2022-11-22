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
    <flip-box padding="24" slot="navigation"><a href="#">Test</a></flip-box>
    <div slot="user">User</div>
    <flip-box center-block center-inline cover slot="content">Content</flip-box>
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
