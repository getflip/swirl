import { generateStoryElement } from "../../utils";
import Docs from "./swirl-list.mdx";

export default {
  component: "swirl-list",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlList",
};

const Template = (args) => {
  const container = document.createElement("swirl-stack");
  container.spacing = "24";

  const unorderedList = generateStoryElement("swirl-list", args);
  unorderedList.innerHTML = `
    <ul>
      <li>Level 1</li>
      <li>Level 1
        <ul>
          <li>Level 2</li>
          <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et.</li>
        </ul>
      </li>
      <li>Level 1</li>
    </ul>
  `;

  const orderedList = generateStoryElement("swirl-list", args);
  orderedList.innerHTML = `
    <ol>
      <li>Level 1</li>
      <li>Level 1
        <ol>
          <li>Level 2</li>
          <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et.</li>
        </ol>
      </li>
      <li>Level 1</li>
    </ol>
  `;

  container.append("\n  ", unorderedList, "\n  ", orderedList, "\n");

  return container;
};

export const SwirlList = Template.bind({});

SwirlList.args = {};
