import { generateStoryElement } from "../../utils";
import Docs from "./swirl-dialog.mdx";

export default {
  component: "flip-dialog",
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `<flip-dialog id="my-dialog" label="Dialog" primary-action-label="Leave" secondary-action-label="Cancel">
  <p>Do you really want to leave this group chat?</p>
</flip-dialog>

<script>
  const dialog = document.body.querySelector('#my-dialog');
  dialog.open();
</script>`,
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
  intent: "critical",
  label: "Dialog",
  primaryActionLabel: "Leave",
  secondaryActionLabel: "Cancel",
};
