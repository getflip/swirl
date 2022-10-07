import { FunctionComponent } from "react";
import { IconData } from "..";

interface IconInfoProps {
  icon: IconData;
}

export const IconInfo: FunctionComponent<IconInfoProps> = ({ icon }) => (
  <div className="hidden md:block max-w-[280px]">
    <h2 className="mb-2">{icon.name}</h2>
    <p className="text-sm font-normal mb-6">{icon.description}</p>
    <a
      href={icon.id}
      className="bg-border-info px-4 py-2 rounded-xl text-text-on-status"
    >
      Download Icon
    </a>
    <hr className="border-b-1 my-6" />
    <h2 className="mb-2">Figma Library</h2>
    <p className="text-sm font-normal mb-6">
      Non tristique amet, quam egestas ultricies etiam
    </p>
    <h2 className="mb-2">Code</h2>
    <p className="text-sm font-normal mb-6">
      Non tristique amet, quam egestas ultricies etiam
    </p>
  </div>
);

export default IconInfo;
