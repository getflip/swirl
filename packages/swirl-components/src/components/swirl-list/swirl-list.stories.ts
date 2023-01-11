import { generateStoryElement } from "../../utils";
import Docs from "./swirl-list.mdx";

export default {
  component: "flip-list",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipList",
};

const Template = (args) => {
  const container = document.createElement("flip-stack");
  container.spacing = "24";

  const unorderedList = generateStoryElement("flip-list", args);
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

  const orderedList = generateStoryElement("flip-list", args);
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

export const FlipList = Template.bind({});

FlipList.args = {};
