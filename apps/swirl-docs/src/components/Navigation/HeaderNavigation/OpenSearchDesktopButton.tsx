import commandPaletteObserver from "@swirl/lib/search/commandPaletteObserver";
import classNames from "classnames";
import { FunctionComponent, useState } from "react";

const macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i;

export const OpenSearchDesktopButton: FunctionComponent = () => {
  const [isMacOs] = useState(() =>
    macosPlatforms.test(window.navigator.userAgent.toLowerCase())
  );

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
        <i className={`swirl-icons-Search24 text-icon-default text-2xl`}></i>
        <span className="ml-2 text-left text-text-subdued">Search...</span>
      </span>
      <span
        className={classNames(
          "hidden md:inline-flex justify-center items-center",
          {
            "w-7": isMacOs,
            "w-16": !isMacOs,
          },
          "h-7 rounded-border-radius-s border-border-default border-1",
          "text-xs text-text-subdued"
        )}
      >
        {isMacOs ? "⌘" : "CTRL+"}K
      </span>
    </button>
  );
};
