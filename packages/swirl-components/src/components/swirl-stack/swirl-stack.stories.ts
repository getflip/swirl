import { generateStoryElement } from "../../utils";
import Docs from "./swirl-stack.mdx";

export default {
  component: "swirl-stack",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlStack",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-stack", args);

  element.innerHTML = `
    <swirl-badge label="Dennis" intent="banana"></swirl-badge>
    <swirl-badge label="Lennart" intent="blueberry"></swirl-badge>
    <swirl-badge label="Jan" intent="chilli"></swirl-badge>
    <swirl-badge label="Konsti" intent="critical"></swirl-badge>
    <swirl-badge label="Adam" intent="grape"></swirl-badge>
    <swirl-badge label="Dario" intent="kiwi"></swirl-badge>
    <swirl-badge label="Fabi" intent="pumpkin"></swirl-badge>
  `;

  return element;
};

export const SwirlStack = Template.bind({});

SwirlStack.args = {};
