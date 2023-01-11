import { generateStoryElement } from "../../utils";
import Docs from "./swirl-empty-state.mdx";

export default {
  component: "flip-empty-state",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipEmptyState",
};

const Template = (args) => {
  const element = generateStoryElement("flip-empty-state", args);

  element.innerHTML = `
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua.
  `;

  return element;
};

export const FlipEmptyState = Template.bind({});

FlipEmptyState.args = {
  heading: "Nothing to see here.",
  illustration: "/images/empty-state-1.svg",
};
