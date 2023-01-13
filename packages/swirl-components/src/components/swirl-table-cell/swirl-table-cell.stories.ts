import { generateStoryElement } from "../../utils";
import Docs from "./swirl-table-cell.mdx";

export default {
  component: "swirl-table-cell",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlTableCell",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-table-cell", args);

  element.innerHTML = `Table cell`;

  return element;
};

export const SwirlTableCell = Template.bind({});

SwirlTableCell.args = {};
