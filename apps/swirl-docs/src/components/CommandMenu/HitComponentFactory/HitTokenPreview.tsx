import { SwirlIconMoreVertikal } from "@getflip/swirl-components-react";
import { AlgoliaRecord } from "@swirl/lib/search";
import { FunctionComponent } from "react";

type HitTokenPreviewProps = {
  title: string;
  tokenCategory: AlgoliaRecord["tokenCategory"];
};

export const HitTokenPreview: FunctionComponent<HitTokenPreviewProps> = ({
  title,
  tokenCategory,
}) => {
  if (tokenCategory === "border") {
    return <div className={`w-5 h-5 bg-icon-default rounded-${title}`}></div>;
  }

  if (tokenCategory === "spacing") {
    return (
      <div className={`w-5`}>
        <div className="bg-interactive-primary-default w-2 h-2 rounded-full"></div>
        <div className={`bg-icon-disabled w-2 h-${title} rounded-full`}></div>
        <div className="bg-interactive-primary-default w-2 h-2 rounded-full"></div>
      </div>
    );
  }

  if (tokenCategory === "typography") {
    return (
      <div
        className={`w-5 h-5 text-${title} font-${title} leading-${title} tracking-${title}`}
      >
        Aa
      </div>
    );
  }

  if (tokenCategory === "z-index") {
    return <SwirlIconMoreVertikal size={20} />;
  }

  return <div className={`w-5 h-5 bg-${title} rounded-border-radius-xs`}></div>;
};
