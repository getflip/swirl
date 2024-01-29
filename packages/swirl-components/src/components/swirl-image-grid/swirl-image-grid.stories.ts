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
  const container = document.createElement("div");
  const element = generateStoryElement("swirl-image-grid", args);

  container.style.height = "1000vh";
  container.style.paddingTop = "calc(200vh)";

  element.innerHTML = args.slot;

  container.append(element.cloneNode(true));
  container.append(element.cloneNode(true));
  container.append(element.cloneNode(true));
  container.append(element.cloneNode(true));
  container.append(element.cloneNode(true));
  container.append(element.cloneNode(true));
  container.append(element.cloneNode(true));
  container.append(element.cloneNode(true));
  container.append(element.cloneNode(true));
  container.append(element.cloneNode(true));

  return container;
};

export const SwirlImageGrid = Template.bind({});

SwirlImageGrid.args = {
  aspectRatio: "16 / 9",
  slot: `<swirl-image-grid-item alt="Cute dog in a blanket" interactive src="/sample.jpg"></swirl-image-grid-item>`,
};
