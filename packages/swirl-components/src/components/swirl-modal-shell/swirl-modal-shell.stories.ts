import { generateStoryElement } from "../../utils";
import Docs from "./swirl-modal-shell.mdx";

export default {
  component: "swirl-modal-shell,",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `<swirl-modal-shell label="Modal" close-button-label="Close">
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
</swirl-modal-shell>`,
      },
    },
  },
  title: "Components/SwirlModalShell",
};

const Template = (args) => {
  const container = document.createElement("div");
  container.style.height = "350px";
  container.style.background =
    "linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)";
  const trigger = document.createElement("swirl-button");
  trigger.label = "Open modal";

  let isOpen = false;
  let element: HTMLSwirlModalShellElement;

  const updateModal = () => {
    if (isOpen) {
      element = generateStoryElement(
        "swirl-modal-shell",
        args
      ) as HTMLSwirlModalShellElement;

      element.innerHTML = `
        <swirl-box width="400px">
          <swirl-text>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
            clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet.
          </swirl-text>
        </swirl-box>
        `;

      element.addEventListener("closeModal", handleClose);

      container.appendChild(element);
    } else {
      element.removeEventListener("closeModal", handleClose);
      element.parentElement.removeChild(element);
    }
  };

  const handleClose = () => {
    isOpen = false;
    updateModal();
  };

  const handleOpen = () => {
    isOpen = true;
    updateModal();
  };

  trigger.addEventListener("click", handleOpen);

  container.append(trigger);

  return container;
};

export const SwirlModalShell = Template.bind({});

SwirlModalShell.args = {
  label: "Modal",
  closeButtonLabel: "Close",
};
