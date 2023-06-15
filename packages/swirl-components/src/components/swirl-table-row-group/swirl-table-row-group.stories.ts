import { generateStoryElement } from "../../utils";
import Docs from "./swirl-table-row-group.mdx";

export default {
  component: "swirl-table-row-group",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlTableRowGroup",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-table-row-group", args);

  return element;
};

export const SwirlTableRowGroup = Template.bind({});

SwirlTableRowGroup.args = {
  label: "Table row group",
};
