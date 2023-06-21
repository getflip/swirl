import { generateStoryElement } from "../../utils";
import Docs from "./swirl-image-grid.mdx";

export default {
  component: "swirl-image-grid",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlImageGrid",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-image-grid", args);

  element.innerHTML = `
  <swirl-image-grid-item alt="Cute dog in a blanket" interactive src="/sample.jpg"></swirl-image-grid-item>
  <swirl-image-grid-item alt="Another cute dog in a blanket" interactive src="/sample-2.jpg"></swirl-image-grid-item>
  <swirl-image-grid-item alt="Third cute dog in a blanket" interactive src="/sample-3.jpg"></swirl-image-grid-item>
`;

  return element;
};

export const SwirlImageGrid = Template.bind({});

SwirlImageGrid.args = {
  aspectRatio: "16 / 9",
};
