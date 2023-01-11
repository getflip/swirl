import { generateStoryElement } from "../../utils";
import Docs from "./swirl-modal.mdx";

export default {
  component: "flip-modal",
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `<flip-modal id="modal" label="Dialog" primary-action-label="Primary" secondary-action-label="Cancel">
  <flip-text>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
    Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
    sit amet.
  </flip-text>
</flip-modal>

<script>
  const modal = document.body.querySelector('#modal');
  modal.open();
</script>`,
      },
    },
  },
  title: "Components/FlipModal",
};

const Template = (args) => {
  const container = document.createElement("div");
  const trigger = document.createElement("flip-button");
  const element = generateStoryElement(
    "flip-modal",
    args
  ) as HTMLFlipDialogElement;

  trigger.label = "Open modal";
  trigger.addEventListener("click", () => element.open());

  element.innerHTML = `
    <flip-text>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </flip-text>
  `;

  container.append(trigger, element);

  return container;
};

export const FlipModal = Template.bind({});

FlipModal.args = {
  label: "Label",
  primaryActionLabel: "Primary",
  secondaryActionLabel: "Secondary",
};
