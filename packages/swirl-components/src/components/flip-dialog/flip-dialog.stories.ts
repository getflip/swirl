import { generateStoryElement } from "../../utils";
import Docs from "./flip-dialog.mdx";

export default {
  component: "flip-dialog",
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `<flip-dialog label="Dialog">
  <p>Do you really want to leave this group chat?</p>
</flip-dialog>`,
      },
    },
  },
  title: "Components/FlipDialog",
};

const Template = (args) => {
  const container = document.createElement("div");
  const trigger = document.createElement("flip-button");
  const element = generateStoryElement(
    "flip-dialog",
    args
  ) as HTMLFlipDialogElement;

  trigger.label = "Open dialog";
  trigger.addEventListener("click", () => element.open());

  element.innerHTML = `
    <p>Do you really want to leave this group chat?</p>
  `;

  container.append(trigger, element);

  return container;
};

export const FlipDialog = Template.bind({});

FlipDialog.args = {
  label: "Dialog",
};
