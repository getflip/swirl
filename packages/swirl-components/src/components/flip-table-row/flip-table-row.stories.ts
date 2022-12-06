import { generateStoryElement } from "../../utils";
import Docs from "./flip-table-row.mdx";

export default {
  component: "flip-table-row",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipTableRow",
};

const Template = (args) => {
  const element = generateStoryElement("flip-table-row", args);

  element.innerHTML = `Table row`;

  return element;
};

export const FlipTableRow = Template.bind({});

FlipTableRow.args = {};
