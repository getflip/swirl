import { generateStoryElement } from "../../utils";
import Docs from "./swirl-modal.mdx";

export default {
  component: "swirl-modal",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `<swirl-modal id="modal" label="Dialog" primary-action-label="Primary" secondary-action-label="Cancel">
  <swirl-text>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
    Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
    sit amet.
  </swirl-text>
</swirl-modal>

<script>
  const modal = document.body.querySelector('#modal');
  modal.open();
</script>`,
      },
    },
  },
  title: "Components/SwirlModal",
};

const Template = (args) => {
  const container = document.createElement("div");
  const trigger = document.createElement("swirl-button");
  const element = generateStoryElement(
    "swirl-modal",
    args
  ) as HTMLSwirlDialogElement;

  trigger.label = "Open modal";
  trigger.addEventListener("click", () => element.open());

  element.innerHTML = `
    <swirl-text>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </swirl-text>

    <swirl-form-control label="Test" label-position="outside"><swirl-select label="Select">
    <swirl-option-list-section label="Section 1">
      <swirl-option-list-item label="This is an option 1" value="1"></swirl-option-list-item>
      <swirl-option-list-item label="This is an option 2" value="2"></swirl-option-list-item>
      <swirl-option-list-item label="This is an option 3" value="3"></swirl-option-list-item>
    </swirl-option-list-section>
    <swirl-option-list-section label="Section 2">
      <swirl-option-list-item label="This is an option 4" value="4"></swirl-option-list-item>
    </swirl-option-list-section>
  </swirl-select></swirl-form-control>

  `;

  container.append(trigger, element);

  return container;
};

export const SwirlModal = Template.bind({});

SwirlModal.args = {
  label: "Label",
  primaryActionLabel: "Primary",
  secondaryActionLabel: "Secondary",
};
