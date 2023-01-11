import { generateStoryElement } from "../../utils";
import Docs from "./flip-table-cell.mdx";

export default {
  component: "flip-table-cell",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipTableCell",
};

const Template = (args) => {
  const element = generateStoryElement("flip-table-cell", args);

  element.innerHTML = `Table cell`;

  return element;
};

export const FlipTableCell = Template.bind({});

FlipTableCell.args = {};
