import { generateStoryElement } from "../../utils";
import Docs from "./flip-stack.mdx";

export default {
  component: "flip-stack",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipStack",
};

const Template = (args) => {
  const element = generateStoryElement("flip-stack", args);

  element.innerHTML = `
    <flip-badge label="Dennis" intent="decorative-1"></flip-badge>
    <flip-badge label="Lennart" intent="decorative-2"></flip-badge>
    <flip-badge label="Jan" intent="decorative-3"></flip-badge>
    <flip-badge label="Konsti" intent="decorative-4"></flip-badge>
    <flip-badge label="Adam" intent="decorative-5"></flip-badge>
    <flip-badge label="Dario" intent="decorative-6"></flip-badge>
    <flip-badge label="Fabi" intent="decorative-7"></flip-badge>
  `;

  return element;
};

export const FlipStack = Template.bind({});

FlipStack.args = {};
