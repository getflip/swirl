import { generateStoryElement } from "../../utils";
import Docs from "./flip-pdf-reader.mdx";

export default {
  component: "flip-pdf-reader",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipPdfReader",
};

const Template = (args) => {
  const container = document.createElement("div");
  const trigger = document.createElement("flip-button");
  const element = generateStoryElement(
    "flip-pdf-reader",
    args
  ) as HTMLFlipPdfReaderElement;

  trigger.label = "Open PDF reader";
  trigger.addEventListener("click", () => element.open());

  container.append(trigger, element);

  return container;
};

export const FlipPdfReader = Template.bind({});

FlipPdfReader.args = {
  file: "/sample.pdf",
  label: "PDF Reader",
};
