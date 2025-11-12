import { generateStoryElement } from "../../utils";
import Docs from "./swirl-translucent-overlay.mdx";

export default {
  component: "swirl-translucent-overlay",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `<swirl-translucent-overlay overlay-aria-label="Overlay" close-button-aria-label="Close">
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
</swirl-translucent-overlay>`,
      },
    },
  },
  title: "Components/SwirlTranslucentOverlay",
};

const Template = (args) => {
  const container = document.createElement("div");
  container.style.height = "350px";
  container.style.background =
    "linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)";
  const trigger = document.createElement("swirl-button");
  trigger.label = "Open overlay";

  let isOpen = false;
  let element: HTMLSwirlTranslucentOverlayElement;

  const updateOverlay = () => {
    if (isOpen) {
      element = generateStoryElement(
        "swirl-translucent-overlay",
        args
      ) as HTMLSwirlTranslucentOverlayElement;

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

      element.addEventListener("closeOverlay", handleClose);

      container.appendChild(element);
    } else {
      element.removeEventListener("closeOverlay", handleClose);
      element.parentElement.removeChild(element);
    }
  };

  const handleClose = () => {
    isOpen = false;
    updateOverlay();
  };

  const handleOpen = () => {
    isOpen = true;
    updateOverlay();
  };

  trigger.addEventListener("click", handleOpen);

  container.append(trigger);

  return container;
};

export const SwirlTranslucentOverlay = Template.bind({});

SwirlTranslucentOverlay.args = {
  overlayAriaLabel: "Overlay",
  closeButtonAriaLabel: "Close",
};
