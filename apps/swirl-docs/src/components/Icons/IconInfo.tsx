import { FlipIconOpenInNew } from "@getflip/swirl-components-react";
import { FunctionComponent } from "react";
import { IconData } from "src/pages/icons";
import { IconDownload } from "./IconDownload";

interface IconInfoProps {
  icon: IconData;
}

export const IconInfo: FunctionComponent<IconInfoProps> = ({ icon }) => {
  return (
    <aside className="sticky top-16">
      <h2 className="font-semibold text-xl mb-2">{icon?.name}</h2>
      <p className="text-sm font-normal mb-6">{icon?.description}</p>
      <IconDownload icon={icon} />
      <hr className="border-b-1 my-6" />
      <h2 className="font-semibold text-base mb-2">
        <a
          className="inline-flex"
          href="https://swirl-storybook.flip-app.dev/?path=/docs/components-flipicon--flip-icon"
        >
          Component
          <span className="">
            <FlipIconOpenInNew className="ml-1 w-4" />
          </span>
        </a>
      </h2>
    </aside>
  );
};

export default IconInfo;
