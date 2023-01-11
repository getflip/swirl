import { generateStoryElement } from "../../utils";
import Docs from "./swirl-table-row.mdx";

export default {
  component: "swirl-table-row",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlTableRow",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-table-row", args);

  element.innerHTML = `
    <swirl-table-cell>
      <swirl-text size="sm">Cell</swirl-text>
    </swirl-table-cell>
    <swirl-table-cell>
      <swirl-text size="sm">Cell</swirl-text>
    </swirl-table-cell>
  `;

  return element;
};

export const SwirlTableRow = Template.bind({});

SwirlTableRow.args = {};
