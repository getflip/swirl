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
    <flip-badge label="Dennis" intent="banana"></flip-badge>
    <flip-badge label="Lennart" intent="blueberry"></flip-badge>
    <flip-badge label="Jan" intent="chilli"></flip-badge>
    <flip-badge label="Konsti" intent="critical"></flip-badge>
    <flip-badge label="Adam" intent="grape"></flip-badge>
    <flip-badge label="Dario" intent="kiwi"></flip-badge>
    <flip-badge label="Fabi" intent="pumpkin"></flip-badge>
  `;

  return element;
};

export const FlipStack = Template.bind({});

FlipStack.args = {};
