import classNames from "classnames";
import { useCodePreviewContext } from "./CodePreviewContext";
import {
  SwirlIconExpandLess,
  SwirlIconExpandMore,
} from "@getflip/swirl-components-react";

export function CodePreviewExpandButton() {
  const { isLightTheme, isExpanded, setIsExpanded } = useCodePreviewContext();
  return (
    <div
      className={classNames(
        "absolute bottom-0 flex justify-center items-center w-full h-12",
        {
          "bg-[#24292E]": !isLightTheme,
          "bg-surface-raised-default": isLightTheme,
        }
      )}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={classNames(
          "bottom-2 left-auto right-auto flex justify-center items-center text-[#F2F2F2] text-base font-medium",
          {
            "text-[#F2F2F2]": !isLightTheme,
            "text-[#24292E]": isLightTheme,
          }
        )}
      >
        {isExpanded ? "Collapse" : "Expand"}
        {isExpanded ? (
          <SwirlIconExpandLess className="ml-2" size={24} />
        ) : (
          <SwirlIconExpandMore className="ml-2" size={24} />
        )}
      </button>
    </div>
  );
}
