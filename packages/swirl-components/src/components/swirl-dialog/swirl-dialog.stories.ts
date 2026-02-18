import { generateStoryElement } from "../../utils";
import Docs from "./swirl-dialog.mdx";

export default {
  argTypes: {
    returnFocusTo: {
      control: "text",
      description:
        "Use when dialog trigger element is unmounted before the dialog is closed.",
    },
  },
  component: "swirl-dialog",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `<swirl-dialog id="my-dialog" label="Dialog" primary-action-label="Leave" secondary-action-label="Cancel">
  <p>Do you really want to leave this group chat?</p>
</swirl-dialog>

<script>
  const dialog = document.body.querySelector('#my-dialog');
  dialog.open();
</script>`,
      },
    },
  },
  title: "Components/SwirlDialog",
};

const Template = (args) => {
  const container = document.createElement("div");
  const trigger = document.createElement("swirl-button");
  const element = generateStoryElement(
    "swirl-dialog",
    args
  ) as HTMLSwirlDialogElement;

  trigger.label = "Open dialog";
  trigger.addEventListener("click", () => element.open());

  element.innerHTML = `
    <p>Do you really want to leave this group chat?</p>
  `;

  container.append(trigger, element);

  return container;
};

export const SwirlDialog = Template.bind({});

SwirlDialog.args = {
  intent: "primary",
  label: "Dialog",
  primaryActionLabel: "Leave",
  secondaryActionLabel: "Cancel",
};
