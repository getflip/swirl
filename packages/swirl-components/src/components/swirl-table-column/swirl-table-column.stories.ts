import { generateStoryElement } from "../../utils";
import Docs from "./swirl-table-column.mdx";

export default {
  component: "swirl-table-column",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlTableColumn",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-table-column", args);

  element.innerHTML = "Column";

  return element;
};

export const SwirlTableColumn = Template.bind({});

SwirlTableColumn.args = {};
