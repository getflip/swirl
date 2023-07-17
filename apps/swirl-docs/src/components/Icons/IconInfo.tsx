import { SwirlIconOpenInNew } from "@getflip/swirl-components-react";
import { FunctionComponent } from "react";
import { IconData } from "src/pages/icons";
import { IconDownload } from "./IconDownload";

interface IconInfoProps {
  icon: IconData;
}

export const IconInfo: FunctionComponent<IconInfoProps> = ({ icon }) => {
  return (
    <aside className="sticky top-0 max-w-[17.5rem] mt-[200px]">
      <h2 className="font-semibold text-font-size-xl mb-2 text-text-default">
        {icon?.name}
      </h2>
      {/* <p className="text-font-size-sm font-normal mb-6 text-text-default">
        {icon?.description}
      </p> */}
      <IconDownload icon={icon} />
      <hr className="border-b-1 my-6" />
      <h2 className="font-semibold text-base mb-2">
        <a
          className="inline-flex font-semibold text-font-size-base text-text-default"
          href="https://swirl-storybook.flip-app.dev/?path=/docs/components-swirlicon--swirl-icon"
        >
          Component
          <span className="">
            <SwirlIconOpenInNew className="ml-1 w-4" />
          </span>
        </a>
      </h2>
    </aside>
  );
};

export default IconInfo;
