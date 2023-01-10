import { generateStoryElement } from "../../utils";
import Docs from "./flip-table-column.mdx";

export default {
  component: "flip-table-column",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipTableColumn",
};

const Template = (args) => {
  const element = generateStoryElement("flip-table-column", args);

  element.innerHTML = "Column";

  return element;
};

export const FlipTableColumn = Template.bind({});

FlipTableColumn.args = {};
