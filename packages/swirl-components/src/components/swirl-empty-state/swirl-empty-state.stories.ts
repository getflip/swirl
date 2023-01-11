import { generateStoryElement } from "../../utils";
import Docs from "./swirl-empty-state.mdx";

export default {
  component: "swirl-empty-state",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlEmptyState",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-empty-state", args);

  element.innerHTML = `
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua.
  `;

  return element;
};

export const SwirlEmptyState = Template.bind({});

SwirlEmptyState.args = {
  heading: "Nothing to see here.",
  illustration: "/images/empty-state-1.svg",
};
