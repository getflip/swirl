import { generateStoryElement } from "../../utils";
import Docs from "./swirl-pdf-reader.mdx";

export default {
  component: "flip-pdf-reader",
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `<flip-pdf-reader file="/sample.pdf" id="pdf-reader" label="PDF Reader"></flip-pdf-reader>

<script>
  const pdfReader = document.body.querySelector('#pdf-reader');
  pdfReader.open();
</script>`,
      },
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
