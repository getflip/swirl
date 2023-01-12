import { generateStoryElement } from "../../utils";
import Docs from "./swirl-pdf-reader.mdx";

export default {
  component: "swirl-pdf-reader",
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `<swirl-pdf-reader file="/sample.pdf" id="pdf-reader" label="PDF Reader"></swirl-pdf-reader>

<script>
  const pdfReader = document.body.querySelector('#pdf-reader');
  pdfReader.open();
</script>`,
      },
    },
  },
  title: "Components/SwirlPdfReader",
};

const Template = (args) => {
  const container = document.createElement("div");
  const trigger = document.createElement("swirl-button");
  const element = generateStoryElement(
    "swirl-pdf-reader",
    args
  ) as HTMLSwirlPdfReaderElement;

  trigger.label = "Open PDF reader";
  trigger.addEventListener("click", () => element.open());

  container.append(trigger, element);

  return container;
};

export const SwirlPdfReader = Template.bind({});

SwirlPdfReader.args = {
  file: "/sample.pdf",
  label: "PDF Reader",
};
