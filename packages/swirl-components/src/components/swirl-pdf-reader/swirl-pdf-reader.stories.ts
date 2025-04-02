import { generateStoryElement } from "../../utils";
import Docs from "./swirl-pdf-reader.mdx";

export default {
  component: "swirl-pdf-reader",
  tags: ["autodocs"],
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
  argTypes: {
    skipNativeDownload: {
      control: { type: "boolean" },
      description:
        "Use in conjuction with the `downloadStart` event to handle downloads manually.",
    },
  },
};

const Template = (args) => {
  const container = document.createElement("div");
  container.setAttribute("style", "min-height: 250px;");
  const trigger = document.createElement("swirl-button");
  const element = generateStoryElement(
    "swirl-pdf-reader",
    args
  ) as HTMLSwirlPdfReaderElement;

  element.innerHTML = `
    <swirl-action-list-item
      icon="<swirl-icon-attachment></swirl-icon-attachment>"
      label="Custom action"
      slot="menu-items"
    ></swirl-action-list-item>
  `;

  trigger.label = "Open PDF reader";
  trigger.addEventListener("click", () => element.open());

  container.append(trigger, element);

  return container;
};

export const SwirlPdfReader = Template.bind({});

SwirlPdfReader.args = {
  file: "/sample-2.pdf",
  label: "sample.pdf",
};
