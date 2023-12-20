import { apiSpecsNavItems } from "@swirl/lib/navigation/src/data/apiSpecs.data";
import Link from "next/link";
import GetStartedLink from "../Layout/GetStartedLink";

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
      href={navItem.url || "/"}
      className="border-border-1 p-4 rounded-border-radius-base active:bg-surface-overlay-pressed flex flex-col group"
    >
      <div className="grow">
        <div className="font-semibold mb-3">{title}</div>
        <div>{children}</div>
      </div>
      <div className="mt-3 flex justify-start items-center gap-1 text-interactive-primary-default group-hover:text-interactive-primary-hovered">
        <GetStartedLink />
      </div>
    </Link>
  );
};

export default ApiTile;
