import { generateStoryElement } from "../../utils";
import Docs from "./flip-table-row-group.mdx";

export default {
  component: "flip-table-row-group",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipTableRowGroup",
};

const Template = (args) => {
  const element = generateStoryElement("flip-table-row-group", args);

  return element;
};

export const FlipTableRowGroup = Template.bind({});

FlipTableRowGroup.args = {
  label: "Table row group",
};
