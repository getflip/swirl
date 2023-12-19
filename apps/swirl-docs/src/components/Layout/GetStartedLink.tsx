import { SwirlIconArrowRight } from "@getflip/swirl-components-react";

export default function GetStartedLink() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center gap-space-4 text-font-size-sm font-medium text-interactive-primary-default group-hover:text-interactive-primary-hovered"
    >
      Get started
      <SwirlIconArrowRight
        size={20}
        className="transition-margin ease-in-out duration-300 group-hover:ml-2"
      />
    </span>
  );
}
