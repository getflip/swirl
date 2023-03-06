import { generateStoryElement } from "../../utils";
import Docs from "./swirl-card.mdx";

export default {
  component: "swirl-card",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlCard",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-card", args);

  element.innerHTML = `
    <swirl-box padding="16">
      <swirl-text color="subdued" size="sm">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
        dolor sit amet.
      </swirl-text>
    </swirl-box>
  `;

  return element;
};

export const SwirlCard = Template.bind({});

SwirlCard.args = {
  subHeader: "An interesting subheader",
  header: "This is the header of the card",
  imageUrl: "/sample-2.jpg",
};
