import { SwirlIconSearch } from "@getflip/swirl-components-react";
import commandPaletteObserver from "@swirl/lib/search/commandPaletteObserver";
import classNames from "classnames";
import { FunctionComponent } from "react";

export const OpenSearchButton: FunctionComponent = () => {
  function openCommandPalette() {
    commandPaletteObserver.set(true);
  }

  return (
    <button
      type="button"
      onClick={() => openCommandPalette()}
      aria-label="open search"
      className={classNames(
        "inline-flex items-center justify-between w-full md:max-w-[16rem] max-h-10 p-2",
        "border-border-default border-1 rounded-border-radius-sm"
      )}
    >
      <span className="inline-flex items-center">
        <SwirlIconSearch size={24} className="text-icon-default" />
        <span className="ml-2 text-left text-text-subdued">Search...</span>
      </span>
      <span className="hidden md:block w-7 h-7 rounded-border-radius-s border-border-default border-1 text-text-default">
        /
      </span>
    </button>
  );
};
