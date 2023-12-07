import { SwirlIconOpenInNew } from "@getflip/swirl-components-react";
import { FunctionComponent } from "react";
import { IconData } from "src/pages/icons";
import { IconDownload } from "./IconDownload";

interface IconInfoProps {
  icon: IconData;
}

export const IconInfo: FunctionComponent<IconInfoProps> = ({ icon }) => {
  return (
    <aside className="sticky top-8 max-w-[17.5rem] md:mt-[12.5rem] h-fit">
      <h2 className="font-semibold text-font-size-xl mb-2 text-text-default">
        {icon?.name}
      </h2>
      <IconDownload icon={icon} />
      <hr className="border-b-1 my-6" />
      <h2 className="font-semibold text-base mb-2">
        <a
          className="inline-flex font-semibold text-font-size-base text-text-default"
          href="https://swirl-storybook.flip-app.dev/?path=/docs/components-swirlicon--swirl-icon"
          target="_blank"
          rel="noreferrer"
        >
          Component
          <SwirlIconOpenInNew className="ml-1 w-4" />
        </a>
      </h2>
    </aside>
  );
};

export default IconInfo;
