import { generateStoryElement } from "../../utils";
import Docs from "./flip-card.mdx";

export default {
  component: "flip-card",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipCard",
};

const Template = (args) => {
  const element = generateStoryElement("flip-card", args);

  element.innerHTML = `
    <flip-box padding="16">
      <flip-text color="subdued" size="sm">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
        dolor sit amet.
      </flip-text>
    </flip-box>
  `;

  return element;
};

export const FlipCard = Template.bind({});

FlipCard.args = {};
