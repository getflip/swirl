import { generateStoryElement } from "../../utils";
import Docs from "./swirl-columns.mdx";

export default {
  component: "swirl-columns",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlColumns",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-columns", args);

  element.innerHTML = `
    <swirl-box bordered padding="16">
      <swirl-text color="subdued" size="sm">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </swirl-text>
    </swirl-box>
    <swirl-box bordered padding="16">
      <swirl-text color="subdued" size="sm">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </swirl-text>
    </swirl-box>
    <swirl-box bordered padding="16">
      <swirl-text color="subdued" size="sm">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </swirl-text>
    </swirl-box>
  `;

  return element;
};

export const SwirlColumns = Template.bind({});

SwirlColumns.args = {
  spacing: "16",
};
