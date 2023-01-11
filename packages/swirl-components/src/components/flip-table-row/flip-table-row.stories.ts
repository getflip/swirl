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

  element.innerHTML = `
    <flip-table-cell>
      <flip-text size="sm">Cell</flip-text>
    </flip-table-cell>
    <flip-table-cell>
      <flip-text size="sm">Cell</flip-text>
    </flip-table-cell>
  `;

  return element;
};

export const FlipTableRow = Template.bind({});

FlipTableRow.args = {};
