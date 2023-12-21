import { SwirlIconSearch } from "@getflip/swirl-components-react";
import commandPaletteObserver from "@swirl/lib/search/commandPaletteObserver";
import { FunctionComponent } from "react";

export const OpenSearchMobileButton: FunctionComponent = () => {
  function openCommandPalette() {
    commandPaletteObserver.set(true);
  }

  return (
    <button
      type="button"
      className="inline-flex items-center mr-4"
      aria-controls="mobile-navigation"
      onClick={openCommandPalette}
    >
      <SwirlIconSearch size={24} />
    </button>
  );
};
