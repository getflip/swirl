import { SwirlIconArrowRight } from "@getflip/swirl-components-react";
import { apiSpecsNavItems } from "@swirl/lib/navigation/src/data/apiSpecs.data";
import Link from "next/link";

const ApiTile = ({
  title,
  apiName,
  children,
}: {
  title: string;
  children: JSX.Element;
  apiName: string;
}) => {
  const navItem = apiSpecsNavItems.find(
    (navItem) => navItem.specName == apiName
  );
  if (!navItem) {
    return null;
  }

  return (
    <Link
      href={navItem.url}
      className="border-border-1 p-3 rounded-border-radius-base hover:bg-surface-hovered active:bg-surface-overlay-pressed flex flex-col"
    >
      <div className="grow">
        <div className="font-semibold">{title}</div>
        <div>{children}</div>
      </div>
      <div className="flex justify-start items-center gap-1 text-border-info hover:opacity-75">
        Get started <SwirlIconArrowRight size={20} />
      </div>
    </Link>
  );
};

export default ApiTile;
